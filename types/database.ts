// Database types generated from Supabase schema
// Run: npx supabase gen types typescript --project-id [PROJECT_ID] > types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: 'caregiver' | 'patient';
          preferences: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          role?: 'caregiver' | 'patient';
          preferences?: Json;
        };
        Update: {
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: 'caregiver' | 'patient';
          preferences?: Json;
        };
      };
      families: {
        Row: {
          id: string;
          name: string;
          created_by: string;
          invite_code: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_by: string;
          invite_code?: string;
        };
        Update: {
          name?: string;
        };
      };
      family_members: {
        Row: {
          id: string;
          family_id: string;
          user_id: string;
          nickname: string;
          relationship: 'self' | 'parent' | 'child' | 'spouse' | 'other';
          health_score: number | null;
          status: 'good' | 'fair' | 'needs_review';
          joined_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          family_id: string;
          user_id: string;
          nickname: string;
          relationship: 'self' | 'parent' | 'child' | 'spouse' | 'other';
          health_score?: number | null;
          status?: 'good' | 'fair' | 'needs_review';
        };
        Update: {
          nickname?: string;
          relationship?: 'self' | 'parent' | 'child' | 'spouse' | 'other';
          health_score?: number | null;
          status?: 'good' | 'fair' | 'needs_review';
        };
      };
      // Add other tables as needed
      [key: string]: any;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
