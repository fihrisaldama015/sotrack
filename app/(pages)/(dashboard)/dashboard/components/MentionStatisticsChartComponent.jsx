"use client";
import { ResponsiveLine } from "@nivo/line";

const MentionStatisticsChart = ({ data, trendUp }) => {
  return (
    <div className="h-72 w-full">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 30, bottom: 30, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "0",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        enableGridX={false}
        enableGridY={true}
        gridYValues={5}
        lineWidth={3}
        pointSize={12}
        pointColor="#2563EB"
        pointBorderWidth={5}
        pointBorderColor="#ffffff"
        colors={{ scheme: trendUp ? "category10" : "set1" }}
        // pointColor={{ theme: "background" }}
        // pointBorderColor={{ from: "serieColor" }}
        enableArea={true}
        areaBaselineValue={0}
        areaOpacity={0.1}
        enableSlices="x"
        useMesh={true}
        legends={[]}
      />
    </div>
  );
};

export default MentionStatisticsChart;
