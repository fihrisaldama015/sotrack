"use client";
import { ResponsiveLine } from "@nivo/line";

const MentionAnalyticsChart = ({ data, trendUp }) => {
  const min = Math.min(...data[0].data.map((d) => d.y));

  return (
    <div className="h-12 w-full">
      <ResponsiveLine
        data={data}
        margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
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
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        gridYValues={5}
        lineWidth={3}
        pointSize={0}
        // pointColor="#2563EB"
        // pointBorderWidth={4}
        // pointBorderColor="#ffffff"
        colors={{ scheme: trendUp ? "category10" : "set1" }}
        // pointColor={{ theme: "background" }}
        // pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaBaselineValue={0}
        areaOpacity={0.05}
        enableSlices="x"
        useMesh={true}
        legends={[]}
      />
    </div>
  );
};

export default MentionAnalyticsChart;
