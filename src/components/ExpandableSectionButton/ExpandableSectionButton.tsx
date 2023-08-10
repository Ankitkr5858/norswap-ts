// @ts-nocheck
// @ts-nocheck
import styled from 'styled-components'
import { ChevronDownIcon, ChevronUpIcon, Text } from '@nswap/uikit'
import { useTranslation } from 'contexts/Localization'

export interface ExpandableSectionButtonProps {
  onClick?: () => void
  expanded?: boolean
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ onClick, expanded = false }) => {
  const { t } = useTranslation()

  return (
    <Wrapper aria-label={t('Hide or show expandable content')} role="button" onClick={() => onClick()}>
      <Text color="#009EE2" bold>
        {expanded ? t('Hide') : t('Details')}
      </Text>
      {expanded ? <ChevronUpIcon color="#009EE2!important" /> : <ChevronDownIcon color="#009EE2!important" />}
    </Wrapper>
  )
}

export default ExpandableSectionButton
