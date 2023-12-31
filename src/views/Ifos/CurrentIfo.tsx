// @ts-nocheck
// @ts-nocheck
import { useMemo } from 'react'
import useGetPublicIfoV2Data from 'views/Ifos/hooks/v2/useGetPublicIfoData'
import useGetWalletIfoV3Data from 'views/Ifos/hooks/v3/useGetWalletIfoData'

import { Ifo } from 'config/constants/types'

import { IfoCurrentCard } from './components/IfoFoldableCard'
import IfoContainer from './components/IfoContainer'
import IfoSteps from './components/IfoSteps'

interface TypeProps {
  activeIfo: Ifo
}

const CurrentIfo: React.FC<TypeProps> = ({ activeIfo }) => {
  const publicIfoData = useGetPublicIfoV2Data(activeIfo)
  const walletIfoData = useGetWalletIfoV3Data(activeIfo)

  const { poolBasic, poolUnlimited } = walletIfoData

  const isCommitted = useMemo(
    () =>
      poolBasic.amountTokenCommittedInLP.isGreaterThan(0) || poolUnlimited.amountTokenCommittedInLP.isGreaterThan(0),
    [poolBasic.amountTokenCommittedInLP, poolUnlimited.amountTokenCommittedInLP],
  )

  return (
    <IfoContainer
      ifoSection={<IfoCurrentCard ifo={activeIfo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} />}
      ifoSteps={
        <IfoSteps
          isLive={publicIfoData.status === 'live'}
          hasClaimed={poolBasic.hasClaimed || poolUnlimited.hasClaimed}
          isCommitted={isCommitted}
          ifoCurrencyAddress={activeIfo.currency.address}
        />
      }
    />
  )
}

export default CurrentIfo
