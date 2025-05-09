
import { supabase } from './supabaseClient';

export const saveLead = async (leadData) => {
  try {
    const { error } = await supabase
      .from('leads')
      .insert({
        name: leadData.name,
        email: leadData.email,
        company: leadData.company,
        source: leadData.source || 'lead_form'
      });

    if (error) {
      console.error('Error saving lead:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error saving lead:', err);
    return { success: false, error: err };
  }
};
