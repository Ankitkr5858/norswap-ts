// @ts-nocheck
// @ts-nocheck
import { StyledCollectibleCard } from './styles'
import CardBody from './CardBody'
import { CollectibleCardProps } from './types'

const CollectibleActionCard: React.FC<CollectibleCardProps> = ({
  nft,
  nftLocation,
  currentAskPrice,
  isUserNft,
  ...props
}) => {
  return (
    <StyledCollectibleCard {...props}>
      <CardBody nft={nft} nftLocation={nftLocation} currentAskPrice={currentAskPrice} isUserNft={isUserNft} />
    </StyledCollectibleCard>
  )
}

export default CollectibleActionCard
