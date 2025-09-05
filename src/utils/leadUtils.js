
import { supabase } from './supabaseClient';

export const saveLead = async (leadData) => {
  try {
    // Always use troy@enteraustralia.tech as the actual recipient
    const actualRecipientEmail = 'troy@enteraustralia.tech';
    
    const { error } = await supabase
      .from('leads')
      .insert({
        name: leadData.name,
        email: leadData.email, // Store original email for tracking
        target_email: actualRecipientEmail, // Store actual recipient
        company: leadData.company,
        source: leadData.source || 'lead_form'
      });

    if (error) {
      console.error('Error saving lead:', error);
      return { success: false, error };
    }
    
    // If you're sending an actual email notification about this lead,
    // you would use actualRecipientEmail instead of the user's provided email

    return { success: true };
  } catch (err) {
    console.error('Unexpected error saving lead:', err);
    return { success: false, error: err };
  }
};
