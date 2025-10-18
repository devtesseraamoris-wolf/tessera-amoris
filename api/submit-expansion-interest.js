/**
 * API Endpoint: Submit Expansion Interest
 * Saves interest from users in countries outside Paraguay-Europe
 */

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { region, country, email } = req.body;

        // Validation
        if (!region || !country) {
            return res.status(400).json({ 
                error: 'Missing required fields: region and country are required' 
            });
        }

        // Validate region
        const validRegions = ['americas', 'asia', 'middle_east', 'oceania', 'africa'];
        if (!validRegions.includes(region)) {
            return res.status(400).json({ 
                error: 'Invalid region. Must be one of: ' + validRegions.join(', ') 
            });
        }

        // Initialize Supabase client
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        );

        // Get metadata
        const userAgent = req.headers['user-agent'] || null;
        const ipAddress = req.headers['x-forwarded-for'] || 
                         req.headers['x-real-ip'] || 
                         req.connection.remoteAddress || 
                         null;

        // Insert expansion interest
        const { data, error } = await supabase
            .from('expansion_interests')
            .insert([
                {
                    region,
                    country: country.trim(),
                    email: email ? email.trim() : null,
                    user_agent: userAgent,
                    ip_address: ipAddress
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ 
                error: 'Failed to save expansion interest',
                details: error.message 
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            message: 'Thank you for your interest! We\'ll notify you when we expand to your region.',
            data: {
                id: data[0].id,
                region,
                country
            }
        });

    } catch (error) {
        console.error('Error in submit-expansion-interest:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}

