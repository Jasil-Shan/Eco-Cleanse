import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getStats } from "../../../services/adminApi";
import ewasteIcon from '../assets/ewaste-icon.png'
import foodIcon from '../assets/foodWaste-icon.png'
import plasticIcon from '../assets/plastic-Icon.png'
import paperIcon from '../assets/paper-icon.png'
import pieChart from '../assets/pie-chart.png'

const Stats = () => {
  const [totalSums, setTotal] = useState()
  const [count, setCount] = useState()
  const [onlineEmployees, setOnlineEmployee] = useState()
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
  const [totalGarbage, setTotalGarbage] = useState()


  useEffect(() => {
    try {
      (
        async function () {
          const { data } = await getStats()
          if (data.success) {
            console.log(data);
            setTotal(data.totalSums)
            setTotalGarbage(data.totalSum)
            setCount(data.count)
          }
        })()
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (

    <div className=" grid justify-items-stretch md:justify-items-center gap-4 stats-vertical mt-28 md:grid-cols-5 ">
      <div className="card bg-base-100 drop-shadow-xl">
        <div className="stats shadow">
          <div className="stat">
          <div className="stat-figure text-secondary ">
            <img src={pieChart} alt="" />
          </div>
            <div className="stat-title">Total Garbage</div>
            <div className="stat-value"> <CountUp start={0} end={totalGarbage} duration={4.5} separator="," />kg</div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 drop-shadow-xl">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <img src={foodIcon} alt="" />
            </div>
            <div className="stat-title">Food Waste</div>
            <div className="stat-value"> <CountUp start={0} end={totalSums?.foodWaste} duration={4.5} separator="," />kg</div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 drop-shadow-xl">
        <div className="stats shadow">
          <div className="stat">
          <div className="stat-figure text-secondary">
              <img src={plasticIcon} alt="" />
            </div>
            <div className="stat-title">Plastic Waste</div>
            <div className="stat-value"> <CountUp start={0} end={totalSums?.plasticWaste} duration={4.5} separator="," />kg</div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 drop-shadow-xl">
        <div className="stats shadow">
          <div className="stat">
          <div className="stat-figure text-secondary">
              <img src={ewasteIcon} alt="" />
            </div>
            <div className="stat-title">E waste</div>
            <div className="stat-value"> <CountUp start={0} end={totalSums?.eWaste} duration={4.5} separator="," />kg</div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 drop-shadow-xl ">
        <div className="stats shadow">
          <div className="stat">
          <div className="stat-figure text-secondary">
              <img src={paperIcon} alt="" />
            </div>
            <div className="stat-title">Other Waste</div>
            <div className="stat-value"> <CountUp start={0} end={totalSums?.Others} duration={4.5} separator="," />kg</div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Stats;
