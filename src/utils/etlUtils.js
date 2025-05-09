
import fetch from 'node-fetch';
import { logETLRun, getLastETLRun, insertOpportunities, insertResources } from './supabaseClient';

// AusTender Open Data ETL
export const syncAusTender = async () => {
  try {
    // Get last successful run to determine incremental load
    const { data: lastRun } = await getLastETLRun('austender');
    const modifiedSince = lastRun?.[0]?.run_at || null;
    
    // Construct API URL with modified_since if available
    let apiUrl = 'https://www.tenders.gov.au/api/1/current-opportunities';
    if (modifiedSince) {
      apiUrl += `?modified_since=${new Date(modifiedSince).toISOString()}`;
    }
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`AusTender API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform the data to match your opportunities schema
    const opportunities = data.opportunities.map(opp => ({
      id: opp.id || `austender-${opp.atm_id}`,
      title: opp.title,
      description: opp.description || 'No description provided',
      department: opp.agency_name,
      value: opp.estimated_value_aud || null,
      deadline: opp.closing_date,
      url: `https://www.tenders.gov.au/atm/show/${opp.atm_id}`,
      active: true,
      created_at: new Date().toISOString()
    }));
    
    // Insert into Supabase
    const { error } = await insertOpportunities(opportunities);
    
    if (error) {
      throw error;
    }
    
    // Log successful ETL run
    await logETLRun('austender', 'success', {
      records_processed: opportunities.length,
      last_modified: new Date().toISOString()
    });
    
    return { 
      success: true, 
      message: `Successfully synced ${opportunities.length} opportunities from AusTender` 
    };
    
  } catch (error) {
    console.error('AusTender ETL error:', error);
    
    // Log failed ETL run
    await logETLRun('austender', 'failure', {
      error: error.message,
      stack: error.stack
    });
    
    return { 
      success: false, 
      message: `Failed to sync AusTender: ${error.message}` 
    };
  }
};

// Business.gov.au Grants ETL
export const syncBusinessGovGrants = async () => {
  try {
    // Get last successful run to determine incremental load
    const { data: lastRun } = await getLastETLRun('business_gov_au');
    const modifiedSince = lastRun?.[0]?.run_at || null;
    
    // Construct API URL
    let apiUrl = 'https://api.business.gov.au/grants/v1/search';
    const params = new URLSearchParams({
      size: 100,
      status: 'open'
    });
    
    if (modifiedSince) {
      params.append('updated_since', new Date(modifiedSince).toISOString());
    }
    
    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Business.gov.au API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform the data to match your opportunities schema
    const opportunities = data.grants.map(grant => ({
      id: `grant-${grant.id}`,
      title: grant.title,
      description: grant.description || grant.summary || 'No description provided',
      department: grant.provider_name,
      value: grant.estimated_value || null,
      deadline: grant.close_date,
      url: grant.url,
      active: true,
      created_at: new Date().toISOString()
    }));
    
    // Insert into Supabase
    const { error } = await insertOpportunities(opportunities);
    
    if (error) {
      throw error;
    }
    
    // Log successful ETL run
    await logETLRun('business_gov_au', 'success', {
      records_processed: opportunities.length,
      last_modified: new Date().toISOString()
    });
    
    return { 
      success: true, 
      message: `Successfully synced ${opportunities.length} grants from Business.gov.au` 
    };
    
  } catch (error) {
    console.error('Business.gov.au ETL error:', error);
    
    // Log failed ETL run
    await logETLRun('business_gov_au', 'failure', {
      error: error.message,
      stack: error.stack
    });
    
    return { 
      success: false, 
      message: `Failed to sync Business.gov.au: ${error.message}` 
    };
  }
};

// Data.gov.au ETL for specific datasets
export const syncDataGovAu = async (datasetId) => {
  try {
    // Get last successful run
    const { data: lastRun } = await getLastETLRun(`data_gov_au_${datasetId}`);
    
    // Construct API URL
    const apiUrl = `https://data.gov.au/api/3/action/package_show?id=${datasetId}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Data.gov.au API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform into resources
    const resources = data.result.resources.map(resource => ({
      id: `data-gov-${resource.id}`,
      title: resource.name,
      description: resource.description || 'No description provided',
      content: JSON.stringify({
        last_modified: resource.last_modified,
        format: resource.format,
        url: resource.url,
        dataset: datasetId
      }),
      type: 'market_data',
      is_premium: false,
      image_url: null,
      slug: `market-data-${resource.id}`,
      published_at: new Date(resource.last_modified).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
    
    // Insert into Supabase
    const { error } = await insertResources(resources);
    
    if (error) {
      throw error;
    }
    
    // Log successful ETL run
    await logETLRun(`data_gov_au_${datasetId}`, 'success', {
      records_processed: resources.length,
      last_modified: new Date().toISOString()
    });
    
    return { 
      success: true, 
      message: `Successfully synced ${resources.length} resources from Data.gov.au dataset ${datasetId}` 
    };
    
  } catch (error) {
    console.error(`Data.gov.au ETL error for dataset ${datasetId}:`, error);
    
    // Log failed ETL run
    await logETLRun(`data_gov_au_${datasetId}`, 'failure', {
      error: error.message,
      stack: error.stack
    });
    
    return { 
      success: false, 
      message: `Failed to sync Data.gov.au dataset ${datasetId}: ${error.message}` 
    };
  }
};

// Exchange Rate API ETL
export const syncExchangeRates = async () => {
  try {
    const response = await fetch('https://api.exchangerate.host/latest?base=AUD&symbols=USD,EUR,GBP,SGD', {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`ExchangeRate API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Store as a resource
    const resource = {
      id: 'exchange-rates-latest',
      title: 'Latest Exchange Rates',
      description: 'Current exchange rates for AUD to major currencies',
      content: JSON.stringify(data),
      type: 'market_data',
      is_premium: false,
      slug: 'exchange-rates',
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Insert into Supabase
    const { error } = await insertResources([resource]);
    
    if (error) {
      throw error;
    }
    
    // Log successful ETL run
    await logETLRun('exchange_rates', 'success', {
      last_modified: new Date().toISOString(),
      rates: data.rates
    });
    
    return { 
      success: true, 
      message: 'Successfully synced latest exchange rates' 
    };
    
  } catch (error) {
    console.error('Exchange Rate ETL error:', error);
    
    // Log failed ETL run
    await logETLRun('exchange_rates', 'failure', {
      error: error.message,
      stack: error.stack
    });
    
    return { 
      success: false, 
      message: `Failed to sync exchange rates: ${error.message}` 
    };
  }
};

// GitHub API ETL
export const syncGitHubRepoStats = async (owner, repo) => {
  try {
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status} ${repoResponse.statusText}`);
    }
    
    const repoData = await repoResponse.json();
    
    // Fetch latest releases
    const releasesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=5`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!releasesResponse.ok) {
      throw new Error(`GitHub Releases API error: ${releasesResponse.status} ${releasesResponse.statusText}`);
    }
    
    const releasesData = await releasesResponse.json();
    
    // Store as a resource
    const resource = {
      id: `github-${owner}-${repo}`,
      title: `${repo} GitHub Stats`,
      description: `Latest statistics and releases for the ${repo} repository`,
      content: JSON.stringify({
        repo: repoData,
        releases: releasesData
      }),
      type: 'tech_resource',
      is_premium: false,
      slug: `github-${owner}-${repo}`,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Insert into Supabase
    const { error } = await insertResources([resource]);
    
    if (error) {
      throw error;
    }
    
    // Log successful ETL run
    await logETLRun(`github_${owner}_${repo}`, 'success', {
      last_modified: new Date().toISOString(),
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      open_issues: repoData.open_issues_count
    });
    
    return { 
      success: true, 
      message: `Successfully synced GitHub stats for ${owner}/${repo}` 
    };
    
  } catch (error) {
    console.error('GitHub ETL error:', error);
    
    // Log failed ETL run
    await logETLRun(`github_${owner}_${repo}`, 'failure', {
      error: error.message,
      stack: error.stack
    });
    
    return { 
      success: false, 
      message: `Failed to sync GitHub stats: ${error.message}` 
    };
  }
};

// YouTube API ETL
export const syncYouTubeChannelVideos = async (channelId, apiKey) => {
  try {
    if (!apiKey) {
      throw new Error('YouTube API key is required');
    }
    
    // Fetch channel uploads playlist
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    if (!channelResponse.ok) {
      throw new Error(`YouTube API channel error: ${channelResponse.status} ${channelResponse.statusText}`);
    }
    
    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    
    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist ID');
    }
    
    // Fetch latest videos from the uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    if (!videosResponse.ok) {
      throw new Error(`YouTube API videos error: ${videosResponse.status} ${videosResponse.statusText}`);
    }
    
    const videosData = await videosResponse.json();
    
    // Store as a resource
    const resource = {
      id: `youtube-channel-${channelId}`,
      title: 'Latest YouTube Videos',
      description: 'Most recent videos from our YouTube channel',
      content: JSON.stringify(videosData),
      type: 'video_resource',
      is_premium: false,
      slug: `youtube-channel-${channelId}`,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Insert into Supabase
    const { error } = await insertResources([resource]);
    
    if (error) {
      throw error;
    }
    
    // Log successful ETL run
    await logETLRun(`youtube_${channelId}`, 'success', {
      last_modified: new Date().toISOString(),
      videos_count: videosData.items.length
    });
    
    return { 
      success: true, 
      message: `Successfully synced ${videosData.items.length} videos from YouTube channel` 
    };
    
  } catch (error) {
    console.error('YouTube ETL error:', error);
    
    // Log failed ETL run
    await logETLRun(`youtube_${channelId}`, 'failure', {
      error: error.message,
      stack: error.stack
    });
    
    return { 
      success: false, 
      message: `Failed to sync YouTube videos: ${error.message}` 
    };
  }
};

// Helper to run all ETL jobs
export const runAllETLJobs = async (config) => {
  const results = {};
  
  // AusTender - Every 6 hours
  if (shouldRunJob('austender', config, 6)) {
    results.austender = await syncAusTender();
  }
  
  // Business.gov.au - Daily
  if (shouldRunJob('business_gov_au', config, 24)) {
    results.business_gov_au = await syncBusinessGovGrants();
  }
  
  // Data.gov.au - Weekly (168 hours)
  if (shouldRunJob('data_gov_au', config, 168)) {
    results.data_gov_au = await syncDataGovAu(config.dataGovDatasetId || 'australian-open-data');
  }
  
  // Exchange Rates - Hourly
  if (shouldRunJob('exchange_rates', config, 1)) {
    results.exchange_rates = await syncExchangeRates();
  }
  
  // GitHub - Daily
  if (shouldRunJob('github', config, 24)) {
    results.github = await syncGitHubRepoStats(config.githubOwner || 'your-org', config.githubRepo || 'your-repo');
  }
  
  // YouTube - Every 2 hours
  if (shouldRunJob('youtube', config, 2) && config.youtubeApiKey) {
    results.youtube = await syncYouTubeChannelVideos(config.youtubeChannelId || 'your-channel-id', config.youtubeApiKey);
  }
  
  return results;
};

// Helper to determine if a job should run based on last run time
const shouldRunJob = async (source, config, frequencyHours) => {
  // Check if job is explicitly disabled in config
  if (config && config.disabledJobs && config.disabledJobs.includes(source)) {
    return false;
  }
  
  // Get last successful run
  const { data } = await getLastETLRun(source);
  if (!data || data.length === 0) {
    return true; // No previous run, so should run now
  }
  
  const lastRun = new Date(data[0].run_at);
  const hoursElapsed = (Date.now() - lastRun.getTime()) / (1000 * 60 * 60);
  
  return hoursElapsed >= frequencyHours;
};
