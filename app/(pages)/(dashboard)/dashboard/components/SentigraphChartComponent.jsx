"use client";
import { ResponsivePie } from "@nivo/pie";

const SentigraphChart = ({ data }) => {
  return (
    <div className="h-72 w-full">
      {/* <ResponsiveLine
        data={data}
        margin={{ top: 16, right: 0, bottom: 0, left: 0 }}
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
        areaBaselineValue={20}
        areaOpacity={0.05}
        enableSlices="x"
        useMesh={true}
        legends={[]}
      /> */}
      <ResponsivePie
        data={[
          {
            id: "negative",
            label: "Negative",
            value: 41,
            color: "hsl(24, 70%, 50%)",
          },
          {
            id: "positive",
            label: "Positive",
            value: 59,
            color: "hsl(212, 70%, 50%)",
          },
        ]}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={0}
        innerRadius={0.1}
        padAngle={2}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "paired" }}
        borderWidth={2}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        enableArcLabels={false}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            // effects: [
            //   {
            //     on: "hover",
            //     style: {
            //       itemTextColor: "#000",
            //     },
            //   },
            // ],
          },
        ]}
      />
    </div>
  );
};

export default SentigraphChart;
