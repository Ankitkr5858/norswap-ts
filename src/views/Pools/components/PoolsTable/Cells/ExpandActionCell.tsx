// @ts-nocheck
import styled from 'styled-components'
import { Text, ChevronDownIcon } from '@nswap/uikit'
import { useTranslation } from 'contexts/Localization'
import BaseCell from './BaseCell'

interface ExpandActionCellProps {
  expanded: boolean
  isFullLayout: boolean
}

const StyledCell = styled(BaseCell)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  padding-right: 12px;
  padding-left: 0px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
    padding-right: 32px;
    padding-left: 8px;
  }
`

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  height: 24px;
`

const TotalStakedCell: React.FC<ExpandActionCellProps> = ({ expanded, isFullLayout }) => {
  const { t } = useTranslation()
  return (
    <StyledCell role="cell">
      {isFullLayout && (
        <Text color="#009EE2" bold>
          {expanded ? t('Hide') : t('Details')}
        </Text>
      )}
      <ArrowIcon color="#009EE2" toggled={expanded} />
    </StyledCell>
  )
}

export default TotalStakedCell
