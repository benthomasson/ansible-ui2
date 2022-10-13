import { Nav, NavExpandable, NavItem, NavItemSeparator, NavList, PageSection, PageSidebar, Text, Title } from '@patternfly/react-core'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBreakpoint } from '../../framework'
import { useSettings } from '../../framework/Settings'
import { isRouteActive } from '../common/Masthead'
import { RouteE } from '../Routes'

export function ControllerSidebar(props: { isNavOpen: boolean; setNavOpen: (open: boolean) => void }) {
    const { t } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const settings = useSettings()

    const isXl = useBreakpoint('xl')
    const { isNavOpen, setNavOpen } = props
    const onClick = useCallback(
        (route: RouteE) => {
            navigate(route)
            if (!isXl) {
                setNavOpen(false)
            }
        },
        [navigate, isXl, setNavOpen]
    )
    return (
        <PageSidebar
            isNavOpen={isNavOpen}
            style={{ backgroundColor: settings.theme === 'dark' ? 'var(--pf-global--BackgroundColor--300)' : undefined }}
            nav={
                <>
                    <Nav>
                        <NavList>
                            <NavItemSeparator style={{ margin: 0 }} />
                        </NavList>
                    </Nav>
                    <PageSection
                        variant="dark"
                        style={{
                            backgroundColor:
                                settings.theme === 'light'
                                    ? 'var(--pf-global--BackgroundColor--100)'
                                    : 'var(--pf-global--BackgroundColor--400)',
                        }}
                    >
                        <Title headingLevel="h2">{t('Server Name (TODO)')}</Title>
                        <Text component="small" style={{ opacity: 0.7 }}>
                            {t('Automation Controller')}
                        </Text>
                    </PageSection>
                    <Nav>
                        <NavList>
                            {/* <NavItem>{t('Hoas Controller')}</NavItem> */}
                            {/* <NavExpandable
                            key="controller"
                            title="Controller"
                            isExpanded
                            isActive={isRouteActive(
                                [RouteE.Dashboard, RouteE.Jobs, RouteE.Schedules, RouteE.ActivityStream, RouteE.WorkflowApprovals],
                                location
                            )}
                        > */}
                            {/* <NavExpandable
                            key="views"
                            title="Views"
                            isExpanded
                            isActive={isRouteActive(
                                [RouteE.Dashboard, RouteE.Jobs, RouteE.Schedules, RouteE.ActivityStream, RouteE.WorkflowApprovals],
                                location
                            )}
                        >
                            <NavItem isActive={isRouteActive(RouteE.Dashboard, location)}>
                                <Link to={RouteE.Dashboard}>Dashboard</Link>
                            </NavItem>
                            <NavItem isActive={isRouteActive(RouteE.Jobs, location)}>
                                <Link to={RouteE.Jobs}>Jobs</Link>
                            </NavItem>
                            <NavItem isActive={isRouteActive(RouteE.Schedules, location)}>
                                <Link to={RouteE.Schedules}>Schedules</Link>
                            </NavItem>
                            <NavItem isActive={isRouteActive(RouteE.ActivityStream, location)}>
                                <Link to={RouteE.ActivityStream}>Activity stream</Link>
                            </NavItem>
                            <NavItem isActive={isRouteActive(RouteE.WorkflowApprovals, location)}>
                                <Link to={RouteE.WorkflowApprovals}>Workflow approvals</Link>
                            </NavItem>
                        </NavExpandable> */}
                            <NavExpandable
                                key="resources"
                                title={t('Resources')}
                                isExpanded
                                isActive={isRouteActive(
                                    [RouteE.Templates, RouteE.Credentials, RouteE.Projects, RouteE.Inventories, RouteE.Hosts],
                                    location
                                )}
                            >
                                {/* <NavItem isActive={isRouteActive(RouteE.Templates, location)}>
                                <Link to={RouteE.Templates}>Templates</Link>
                            </NavItem> */}
                                <NavItem isActive={isRouteActive(RouteE.Credentials, location)} onClick={() => onClick(RouteE.Credentials)}>
                                    {t('Credentials')}
                                </NavItem>
                                <NavItem isActive={isRouteActive(RouteE.Projects, location)} onClick={() => onClick(RouteE.Projects)}>
                                    {t('Projects')}
                                </NavItem>
                                <NavItem isActive={isRouteActive(RouteE.Inventories, location)} onClick={() => onClick(RouteE.Inventories)}>
                                    {t('Inventories')}
                                </NavItem>
                                <NavItem isActive={isRouteActive(RouteE.Hosts, location)} onClick={() => onClick(RouteE.Hosts)}>
                                    {t('Hosts')}
                                </NavItem>
                            </NavExpandable>
                            <NavExpandable
                                key="access"
                                title={t('Access')}
                                isExpanded
                                isActive={isRouteActive([RouteE.Organizations, RouteE.Users, RouteE.Teams], location)}
                            >
                                <NavItem
                                    isActive={isRouteActive(RouteE.Organizations, location)}
                                    onClick={() => onClick(RouteE.Organizations)}
                                >
                                    {t('Organizations')}
                                </NavItem>
                                <NavItem isActive={isRouteActive(RouteE.Teams, location)} onClick={() => onClick(RouteE.Teams)}>
                                    {t('Teams')}
                                </NavItem>
                                <NavItem isActive={isRouteActive(RouteE.Users, location)} onClick={() => onClick(RouteE.Users)}>
                                    {t('Users')}
                                </NavItem>
                            </NavExpandable>
                            <NavExpandable
                                key="administration"
                                title="Administration"
                                isExpanded
                                isActive={isRouteActive(
                                    [
                                        RouteE.CredentialTypes,
                                        RouteE.Notifications,
                                        RouteE.ManagementJobs,
                                        RouteE.InstanceGroups,
                                        RouteE.Instances,
                                        RouteE.Applications,
                                        RouteE.ExecutionEnvironments,
                                        RouteE.TopologyView,
                                    ],
                                    location
                                )}
                            >
                                {/* <NavItem isActive={isRouteActive(RouteE.CredentialTypes, location)}>
                                <Link to={RouteE.CredentialTypes}>Credential types</Link>
                            </NavItem> */}
                                {/* <NavItem isActive={isRouteActive(RouteE.Notifications, location)}>
                                <Link to={RouteE.Notifications}>Notifications</Link>
                            </NavItem> */}
                                {/* <NavItem isActive={isRouteActive(RouteE.ManagementJobs, location)}>
                                <Link to={RouteE.ManagementJobs}>Management jobs</Link>
                            </NavItem> */}
                                {/* <NavItem isActive={isRouteActive(RouteE.InstanceGroups, location)}>
                                <Link to={RouteE.InstanceGroups}>Instance groups</Link>
                            </NavItem> */}
                                {/* <NavItem isActive={isRouteActive(RouteE.Instances, location)}>
                                <Link to={RouteE.Instances}>Instances</Link>
                            </NavItem> */}
                                {/* <NavItem isActive={isRouteActive(RouteE.Applications, location)}>
                                <Link to={RouteE.Applications}>Applications</Link>
                            </NavItem> */}
                                <NavItem
                                    isActive={isRouteActive(RouteE.ExecutionEnvironments, location)}
                                    onClick={() => onClick(RouteE.ExecutionEnvironments)}
                                >
                                    {t('Execution Environments')}
                                </NavItem>
                                {/* <NavItem isActive={isRouteActive(RouteE.TopologyView, location)}>
                                <Link to={RouteE.TopologyView}>Topology view</Link>
                            </NavItem> */}
                            </NavExpandable>
                            {/* <NavGroup>
                            <NavItem isActive={isRouteActive(RouteE.Settings, location)}>
                                <Link to={RouteE.Settings}>Settings</Link>
                            </NavItem>
                        </NavGroup> */}
                            {/* </NavExpandable> */}
                        </NavList>
                    </Nav>
                </>
            }
        />
    )
}