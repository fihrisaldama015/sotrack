"use client";
import { ResponsiveBar } from "@nivo/bar";

const TypeOfCrimeChart = ({ data }) => {
  return (
    <div className="h-72 w-full">
      <ResponsiveBar
        data={data}
        keys={["jumlah laporan", "data"]}
        indexBy="type_of_crime"
        margin={{ top: 30, right: 20, bottom: 30, left: 30 }}
        padding={0.5}
        innerPadding={4}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "category10" }}
        borderRadius={6}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: -12,
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          // legend: "type of crime",
          // legendPosition: "middle",
          // legendOffset: 32,
          // truncateTickAt: 10,
        }}
        gridYValues={5}
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

export default TypeOfCrimeChart;
