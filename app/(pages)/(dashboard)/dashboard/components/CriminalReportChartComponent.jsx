"use client";
import { ResponsiveBar } from "@nivo/bar";

const CriminalReportChart = ({ data, type }) => {
  return (
    <div className="h-72 w-full">
      <ResponsiveBar
        data={data}
        keys={["data"]}
        indexBy={"index"}
        margin={{ top: 30, right: 0, bottom: 50, left: 20 }}
        padding={0.75}
        innerPadding={0}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "category10" }}
        borderRadius={5}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: -10,
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend:
            type == "monthly" ? "Month" : type == "yearly" ? "Year" : "Day",
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 4,
        }}
        enableGridY={false}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
      />
    </div>
  );
};

export default CriminalReportChart;
