"use client";
import { ResponsiveBar } from "@nivo/bar";

const CriminalReportChart = ({ data, type }) => {
  const length = data.length ? data.length : 1;
  const borderRadius = 100 / (length * 2);
  console.log(length);
  console.log(borderRadius);
  return (
    <div className="h-72 w-full [&>div>div>svg>g>g>rect]:fill-[url(#mygradient)] [&>div>div]:before:content-[url(/assets/icon/Gradient.svg)]">
      <svg width="0" height="0" visibility="hidden">
        <defs>
          <linearGradient id="mygradient" gradientTransform="rotate(90)">
            <stop offset="0" class="" stopColor="#6690fa" />
            <stop offset="1" class="" stopColor="#4679f9" />
          </linearGradient>
        </defs>
      </svg>

      <ResponsiveBar
        data={data}
        keys={["data"]}
        indexBy={"index"}
        margin={{ top: 20, right: 0, bottom: 40, left: 20 }}
        padding={0.75}
        innerPadding={0}
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
          tickPadding: -10,
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          // legend:
          //   type == "monthly"
          //     ? "Month"
          //     : type == "yearly"
          //     ? "Year"
          //     : "Week count in Year",
          // legendPosition: "middle",
          // legendOffset: 32,
          // truncateTickAt: 8,
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
