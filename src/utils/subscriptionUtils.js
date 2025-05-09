
import { supabase } from './supabaseClient';

/**
 * Save an email subscription to Supabase and trigger Stripe customer creation
 * @param {string} email - Email to subscribe
 * @param {string} source - Source of the subscription (e.g., 'resources', 'footer')
 * @returns {Promise<{success: boolean, error: any}>}
 */
export const saveEmailSubscription = async (email, source = 'website') => {
  try {
    // Always use troy@tech4humanity.com.au as actual recipient
    const actualRecipientEmail = 'troy@tech4humanity.com.au';
    
    // Save to Supabase first with both emails
    const { error: supabaseError } = await supabase
      .from('email_subscriptions')
      .upsert({
        email, // Original user input for tracking
        target_email: actualRecipientEmail, // Actual recipient email
        source,
        subscribed_at: new Date().toISOString()
      }, { onConflict: 'email' });

    if (supabaseError) {
      console.error('Error saving subscription to Supabase:', supabaseError);
      return { success: false, error: supabaseError };
    }

    // Create a Stripe customer (or retrieve if exists)
    // Use the actualRecipientEmail for Stripe customer creation
    const response = await fetch('/api/create-stripe-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: actualRecipientEmail, // Send the actual recipient email to Stripe
        originalEmail: email, // Include original email for reference
        source 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating Stripe customer:', errorData);
      return { success: true, warning: errorData.error };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error in saveEmailSubscription:', err);
    return { success: false, error: err };
  }
};
