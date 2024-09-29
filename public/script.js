async function scrape() {
    const urlInput = document.getElementById("urlInput");
    const outputBox = document.getElementById("result");

    const targetUrl = urlInput.value.trim();

    // Show loading message
    outputBox.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch('/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: targetUrl })
        });

        const data = await response.json();

        // Display result in the output box
        outputBox.innerHTML = `
            <div class="output-section">
                <p>Meta Description: ${data.metaDescription}</p>
            </div>
            <div class="output-section">
                <p>Heading Tags:</p>
                <ul>
                    ${data.headingTags.map(tagInfo => `<li>${tagInfo.tag}: ${tagInfo.text}</li>`).join('')}
                </ul>
            </div>
            <div class="output-section">
                <p>Internal Links:</p>
                <ul>${data.internalLinks.map(link => `<li>${link}</li>`).join('')}</ul>
            </div>
            <div class="output-section">
                <p>External Links:</p>
                <ul>${data.externalLinks.map(link => `<li>${link}</li>`).join('')}</ul>
            </div>
            <div class="output-section">
                <p>Broken Links:</p>
                <ul>${data.brokenLinks.map(link => `<li>${link}</li>`).join('')}</ul>
            </div>
            <div class="output-section">
                <p>Image URLs:</p>
                <ul>${data.imageUrls.map(url => `<li>${url}</li>`).join('')}</ul>
            </div>`;
    } catch (error) {
        console.error('Error:', error.message);
        outputBox.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
