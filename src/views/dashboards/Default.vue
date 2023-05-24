<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Pagos registrados"
              value="$53,000"
              description=""
              :icon="{
                component: 'ni ni-money-coins',
                background: 'bg-gradient-primary',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Estudiantes"
              value="2,300"
              description=""
              :icon="{
                component: 'fas fa-users',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="New Clients"
              value="+3,462"
              description=""
              :icon="{
                component: 'ni ni-paper-diploma',
                background: 'bg-gradient-success',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Sales"
              value="$103,430"
              description=""
              :icon="{
                component: 'ni ni-cart',
                background: 'bg-gradient-warning',
                shape: 'rounded-circle',
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <gradient-line-chart
              id="chart-line"
              title="Sales Overview"
              description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021"
              :chart="{
                labels: [
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                datasets: [
                  {
                    label: 'Mobile Apps',
                    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                  },
                ],
              }"
            />
          </div>
          <div class="col-lg-5">
            <authors-table />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "../../examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "../../examples/Charts/GradientLineChart.vue";
import AuthorsTable from "./components/AuthorsTable.vue";

export default {
  name: "DashboardDefault",
  components: {
    MiniStatisticsCard,
    GradientLineChart,
    AuthorsTable,
  },
  data() {
    return {
      image2: "https://source.unsplash.com/1280x720/?cypherpunk",
      image1: "https://source.unsplash.com/1280x720/?cypherpunk",
      image3: "https://source.unsplash.com/1280x720/?cypherpunk",
      jira: "https://source.unsplash.com/1280x720/?jira",
      asana: "https://source.unsplash.com/1280x720/?asana",
      spotify: "https://source.unsplash.com/1280x720/?spotify",
      bootstrap: "https://source.unsplash.com/1280x720/?bootstrap",
      invision: "https://source.unsplash.com/1280x720/?invision",
      slack: "https://source.unsplash.com/1280x720/?slack",
      adobe: "https://sbg.org.gt/SBG/static/images/logo_sbg_white.png",
      sales: {
        us: {
          country: "United States",
          sale: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: "https://source.unsplash.com/1280x720/?flag",
        },
        germany: {
          country: "Germany",
          sale: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: "https://source.unsplash.com/1280x720/?flag",
        },
        britain: {
          country: "Great Britain",
          sale: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: "https://source.unsplash.com/1280x720/?flag",
        },
        brasil: {
          country: "Brasil",
          sale: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: "https://source.unsplash.com/1280x720/?flag",
        },
      },
    };
  },
};
</script>
