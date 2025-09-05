
import { supabase } from './supabaseClient';

/**
 * Save an email subscription to Supabase and trigger Stripe customer creation
 * @param {string} email - Email to subscribe
 * @param {string} source - Source of the subscription (e.g., 'resources', 'footer')
 * @returns {Promise<{success: boolean, error: any}>}
 */
export const saveEmailSubscription = async (email, source = 'website') => {
  try {
    // Always use troy@enteraustralia.tech as actual recipient
    const actualRecipientEmail = 'troy@enteraustralia.tech';
    
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

    // Create a Stripe customer using Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('create-stripe-customer', {
      body: { 
        email: actualRecipientEmail, // Send the actual recipient email to Stripe
        originalEmail: email, // Include original email for reference
        source 
      }
    });

    if (error) {
      console.error('Error creating Stripe customer:', error);
      return { success: true, warning: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error in saveEmailSubscription:', err);
    return { success: false, error: err };
  }
};
