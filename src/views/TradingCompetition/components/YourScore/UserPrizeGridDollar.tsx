// @ts-nocheck
// @ts-nocheck
import { Text, Skeleton } from '@nswap/uikit'

interface UserPrizeGridDollarProps {
  dollarValueOfTokensReward: number
}

const UserPrizeGridDollar: React.FC<UserPrizeGridDollarProps> = ({ dollarValueOfTokensReward }) => {
  return dollarValueOfTokensReward !== null ? (
    <Text fontSize="12px" color="textSubtle">
      ~{dollarValueOfTokensReward.toFixed(2)} USD
    </Text>
  ) : (
    <Skeleton height={24} width={80} />
  )
}

export default UserPrizeGridDollar
