;// supabase.js
// 1) Replace these values with your Supabase project keys (from the Supabase UI).
// 2) Set tableName to your actual table.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://aqsdaqoquovkrwycgaeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxc2RhcW9xdW92a3J3eWNnYWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Nzg4NjQsImV4cCI6MjA3NTQ1NDg2NH0.syK0lPFMWSkELBOezc5gvcEazU8j0j8t34Ak3DBfhCY';
export const supabase = createClient(supabaseUrl, supabaseKey);

export const tableName = 'Enrolment'; // change to your table name

export async function getAllRows() {
  const { data, error } = await supabase
    .from(tableName)
    .select('*');

  if (error) {
    console.error('Supabase select error:', error);
    throw error;
  }

  return data;
}

export async function insertRow(row) {
  const { data, error } = await supabase
    .from(tableName)
    .insert([row]);

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }

  return data;
}

export async function updateRow(id, updates) {
  const { data, error } = await supabase
    .from(tableName)
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Supabase update error:', error);
    throw error;
  }

  return data;
}

export async function deleteRow(id) {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase delete error:', error);
    throw error;
  }

  return data;
}
