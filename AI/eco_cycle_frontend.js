const apiKey = 'your-api-key';

async function getRecyclingSuggestion() {
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: 'Provide recycling suggestions for a plastic bottle',
                max_tokens: 100
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            console.log(data.choices[0].text.trim());
        } else {
            throw new Error('Invalid API response: No choices available');
        }
    } catch (error) {
        console.error(`Error in getRecyclingSuggestion: ${error.message}`);
    }
}

getRecyclingSuggestion();
