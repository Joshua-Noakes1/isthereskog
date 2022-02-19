<script lang="ts">
  import { onMount } from "svelte";
  import { Chart, registerables } from "chart.js";
  Chart.register(...registerables);
  let buCode = "";
  let myCrt;

  async function createCanvas(buCode) {
    let getStock = await fetch(
      `https://skog-vercel.vercel.app/api/skog/getStock?buCode=${buCode}`
    );
    let ikStock = await getStock.json();

    if (ikStock.success != true) {
      alert(ikStock.message);
      return console.error(ikStock.message);
    }
    const canvas = <HTMLCanvasElement>document.getElementById("myChart");
    const ctx = canvas.getContext("2d");
    myCrt = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "In Stock",
          "Predict +1",
          "Predict +2",
          "Predict +3",
          "Predict +4",
        ],
        datasets: [
          {
            label: `Store: ${ikStock.store.name}`,
            data: [
              ikStock.stock.stock,
              ikStock.stock.forecast[0].stock,
              ikStock.stock.forecast[1].stock,
              ikStock.stock.forecast[2].stock,
              ikStock.stock.forecast[3].stock,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        // maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  async function btnHndl() {
    if (myCrt != undefined) {
      const canvas = <HTMLCanvasElement>document.getElementById("myChart");
      const ctx = canvas.getContext("2d");
      await ctx.clearRect(0, 0, canvas.width, canvas.height);
      await myCrt.destroy();
    }
    return await createCanvas(buCode);
  }
</script>

<div class="has-text-centered">
  <p class="title is-4">Enter buCode</p>
  <input class="input" placeholder="Enter valid buCode" bind:value={buCode} />
  <div style="margin: 10px 0 10px 0;"></div>
  <button class="button" on:click={btnHndl}>Check Fat Bear</button>
</div>
<div style="margin: 10px 0 10px 0;"></div>
<canvas id="myChart" />
