'use client'
import { DonutChart } from '@tremor/react';

const datahero = [
  {
    name: 'Noche Holding AG',
    value: 9800,
  },
  {
    name: 'Rain Drop AG',
    value: 4567,
  },
  {
    name: 'Push Rail AG',
    value: 3908,
  },
  {
    name: 'Flow Steal AG',
    value: 2400,
  },
  {
    name: 'Tiny Loop Inc.',
    value: 2174,
  },
  {
    name: 'Anton Resorts Holding',
    value: 1398,
  },
];

const dataFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function DonutChartHero (){
  return<div>
    asdf
    <div className="mx-auto space-y-12">
      <div className="space-y-3">
        <span className="text-center block font-mono  ">
          Overall Analysis
        </span>
        <div className="flex justify-center">
          <DonutChart
            data={datahero}
            variant="donut"
            colors={[
                'tremor-blue-400',
                'tremor-blue-900'
              ]}
        

            valueFormatter={dataFormatter}
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </div>
      
    </div>
  </div>

}
