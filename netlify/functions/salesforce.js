exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the incoming lead data
    const data = JSON.parse(event.body);

    // Validate required fields
    if (!data.Email || !data.FirstName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: Email and FirstName are required' })
      };
    }

    // Your Salesforce Organization ID
    const orgId = '00Da30000055To6';

    // Build description with property interest and budget info
    let description = '';
    if (data.Property_Interest__c) {
      description += `Property Interest: ${data.Property_Interest__c}\n`;
    }
    if (data.Budget__c) {
      description += `Budget: ${data.Budget__c}\n`;
    }
    if (data.Description) {
      description += `\nNotes: ${data.Description}`;
    }

    // Build Web-to-Lead form data (NO debug this time)
    const formData = new URLSearchParams({
      oid: orgId,
      first_name: data.FirstName,
      last_name: data.LastName || 'N/A',
      email: data.Email,
      phone: data.Phone || '',
      company: data.Company || 'REM Dubai Lead',
      description: description.trim(),
      lead_source: data.LeadSource || 'Website'
      // Removed debug and debugEmail to avoid spam
    });

    console.log('Submitting to Salesforce Web-to-Lead:', formData.toString());

    // Submit to Salesforce Web-to-Lead
    const response = await fetch('https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });

    console.log('Salesforce response status:', response.status);
    const responseText = await response.text();
    console.log('Salesforce response:', responseText);

    // Web-to-Lead returns 200 even on success
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Lead submitted successfully to Salesforce',
          note: 'Check Salesforce → Leads tab (make sure Web-to-Lead is enabled in Setup)'
        })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: 'Failed to submit lead',
          details: responseText
        })
      };
    }

  } catch (error) {
    console.error('Salesforce API Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
