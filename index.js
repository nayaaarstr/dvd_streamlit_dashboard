// Load Dashboard Data
async function loadDashboard() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/dashboard"
        );

        const data = await response.json();

        document.getElementById("revenue").innerText =
            "$" + data.total_revenue;

        createRevenueChart(data.monthly_revenue);

    } catch(error) {

        console.error(error);

    }
}

// Revenue Chart
function createRevenueChart(chartData) {

    const trace = {
        x: chartData.month,
        y: chartData.revenue,
        type: "bar"
    };

    const layout = {
        title: "Monthly Revenue"
    };

    Plotly.newPlot(
        "revenueChart",
        [trace],
        layout
    );
}

// AI Assistant
async function askAI() {

    const prompt =
        document.getElementById("prompt").value;

    const response = await fetch(
        "http://localhost:11434/api/generate",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                model: "llama3",
                prompt: prompt
            })
        }
    );

    const result = await response.json();

    document.getElementById("aiResponse").innerText =
        result.response;
}

// Initialize Dashboard
loadDashboard();