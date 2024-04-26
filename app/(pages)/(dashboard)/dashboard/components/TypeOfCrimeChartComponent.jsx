"use client";
import { ResponsiveBar } from "@nivo/bar";

const TypeOfCrimeChart = ({ data }) => {
  const length = data?.length > 0 ? data.length : 1;
  let borderRadius = 40 - length * 3;
  borderRadius = borderRadius < 3 ? 3 : borderRadius;
  return (
    <div className="h-72 w-full">
      <ResponsiveBar
        data={data}
        keys={["data"]}
        indexBy="type_of_crime"
        margin={{ top: 30, right: 20, bottom: 30, left: 30 }}
        padding={0.6}
        innerPadding={4}
        groupMode="grouped"
        valueScale={{ type: "symlog" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "category10" }}
        borderRadius={borderRadius}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 0,
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          // legend: "type of crime",
          // legendPosition: "middle",
          // legendOffset: 32,
          truncateTickAt: 8,
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
