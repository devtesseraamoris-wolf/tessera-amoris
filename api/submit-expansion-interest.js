/**
 * API Endpoint: Submit Expansion Interest
 * Handles submissions when users select "My country isn't listed yet"
 */

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { region, country, email, timestamp } = req.body;

        // Validate required fields
        if (!region || !country) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                message: 'Region and country are required' 
            });
        }

        // Initialize Supabase client
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error('Supabase credentials not configured');
            // Still return success to user, data is saved in localStorage
            return res.status(200).json({ 
                success: true,
                message: 'Interest recorded (localStorage only)',
                saved_locally: true
            });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Insert into expansion_interests table
        const { data, error } = await supabase
            .from('expansion_interests')
            .insert([
                {
                    region: region,
                    country: country,
                    email: email || null,
                    submitted_at: timestamp || new Date().toISOString(),
                    user_agent: req.headers['user-agent'] || null,
                    ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress || null
                }
            ])
            .select();

        if (error) {
            console.error('Supabase insertion error:', error);
            // Still return success to user
            return res.status(200).json({ 
                success: true,
                message: 'Interest recorded',
                saved_locally: true,
                database_error: error.message
            });
        }

        return res.status(200).json({ 
            success: true,
            message: 'Expansion interest submitted successfully',
            data: data
        });

    } catch (error) {
        console.error('Error processing expansion interest:', error);
        
        // Return success anyway - data is in localStorage
        return res.status(200).json({ 
            success: true,
            message: 'Interest recorded',
            saved_locally: true,
            error: error.message
        });
    }
}

