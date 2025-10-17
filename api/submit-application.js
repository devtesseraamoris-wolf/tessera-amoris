// Vercel Serverless Function for Application Submission
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // Get form data from request body
    const formData = req.body;
    
    // Extract quiz data if present
    const quizData = formData.quizData || null;

    // Validate required fields
    if (!formData.fullName || !formData.email) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Full name and email are required' 
      });
    }

    // Insert application into database
    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          // Personal Information
          full_name: formData.fullName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          nationality: formData.nationality,
          
          // Faith & Values
          faith_tradition: formData.faithTradition,
          faith_importance: formData.faithImportance,
          church_involvement: formData.churchInvolvement,
          core_values: formData.coreValues,
          
          // Relationship Goals
          marital_status: formData.maritalStatus,
          has_children: formData.hasChildren,
          children_count: formData.childrenCount,
          wants_children: formData.wantsChildren,
          family_vision: formData.familyVision,
          partner_qualities: formData.partnerQualities,
          
          // Verification
          occupation: formData.occupation,
          languages: formData.languages,
          photo_url: formData.photoUrl,
          reference_1_name: formData.reference1Name,
          reference_1_relationship: formData.reference1Relationship,
          reference_1_email: formData.reference1Email,
          reference_1_phone: formData.reference1Phone,
          reference_2_name: formData.reference2Name,
          reference_2_relationship: formData.reference2Relationship,
          reference_2_email: formData.reference2Email,
          reference_2_phone: formData.reference2Phone,
          
          // Quiz Data (if completed)
          quiz_score: quizData ? quizData.score : null,
          quiz_responses: quizData ? quizData.responses : null,
          quiz_completed_at: quizData ? quizData.completedAt : null,
          quiz_result_category: quizData ? quizData.category : null,
          quiz_time_spent: quizData ? quizData.timeSpent : null,
          
          // Metadata
          ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          user_agent: req.headers['user-agent'],
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: error.message 
      });
    }

    // Get total count of applications for position number
    const { count } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true });

    // Send success response with position
    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: data[0].id,
      position: count || 1,
      email: formData.email
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
}

