"use client";
import { ResponsivePie } from "@nivo/pie";

const SentigraphChart = ({ data }) => {
  return (
    <div className="h-48 w-full">
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
        margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
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
        // legends={[
        //   {
        //     anchor: "bottom",
        //     direction: "row",
        //     justify: false,
        //     translateX: 0,
        //     translateY: 56,
        //     itemsSpacing: 0,
        //     itemWidth: 100,
        //     itemHeight: 18,
        //     itemTextColor: "#999",
        //     itemDirection: "left-to-right",
        //     itemOpacity: 1,
        //     symbolSize: 18,
        //     symbolShape: "circle",
        //   },
        // ]}
      />
    </div>
  );
};

export default SentigraphChart;
