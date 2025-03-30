
import CookNavBAr from '@/components/ui/cooknavbar/cooknavbar';
import { useAllEarnings } from '@/modules/cook/earnings/api/getAllEarnings'
import WithdrawEarningsForm from '@/modules/cook/earnings/components/withdrawEarnings'
import React from 'react'

export const WithdrawEarnings = () => {
  const {data:earnings}= useAllEarnings();
  console.log("earnings", earnings)
  return (
    <div>
      <CookNavBAr/>
      <WithdrawEarningsForm/>
    </div>
  )
}
