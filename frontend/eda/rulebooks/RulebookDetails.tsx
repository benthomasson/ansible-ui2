import { DropdownPosition, PageSection } from '@patternfly/react-core'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { PageHeader, PageLayout, TypedActions } from '../../../framework'
import { Scrollable } from '../../../framework/components/Scrollable'
import { TableDetails } from '../../../framework/PageTableDetails'
import { useSettings } from '../../../framework/Settings'
import { useGet } from '../../common/useItem'
import { RouteE } from '../../Routes'
import { EdaRulebook } from '../interfaces/EdaRulebook'
import { useRulebookActions } from './hooks/useRulebookActions'
import { useRulebookColumns } from './hooks/useRulebookColumns'

export function RulebookDetails() {
  const { t } = useTranslation()
  const params = useParams<{ id: string }>()
  const { data: rulebook, mutate: refresh } = useGet<EdaRulebook>(
    `/api/rulebooks/${params.id ?? ''}`
  )
  const settings = useSettings()
  const tableColumns = useRulebookColumns()
  const itemActions = useRulebookActions(refresh)
  return (
    <PageLayout>
      <PageHeader
        title={rulebook?.name}
        breadcrumbs={[
          { label: t('Rulebooks'), to: RouteE.EdaRulebooks },
          { label: rulebook?.name },
        ]}
        headerActions={
          <TypedActions<EdaRulebook>
            actions={itemActions}
            position={DropdownPosition.right}
            selectedItem={rulebook}
          />
        }
      />
      <Scrollable>
        <PageSection
          variant="light"
          style={{
            backgroundColor:
              settings.theme === 'dark' ? 'var(--pf-global--BackgroundColor--300)' : undefined,
          }}
        >
          <TableDetails item={rulebook} columns={tableColumns} />
        </PageSection>
      </Scrollable>
    </PageLayout>
  )
}