import { Static, Type } from '@sinclair/typebox';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { PageForm, PageFormSubmitHandler, PageHeader, PageLayout } from '../../../../framework';
import { PageFormSchema } from '../../../../framework/PageForm/PageFormSchema';
import { requestPatch } from '../../../common/crud/Data';
import { useGet } from '../../../common/crud/useGet';
import { usePostRequest } from '../../../common/crud/usePostRequest';
import { useInvalidateCacheOnUnmount } from '../../../common/useInvalidateCache';
import { RouteObj } from '../../../Routes';
import { API_PREFIX } from '../../constants';
import { EdaRole } from '../../interfaces/EdaRole';

export function EditRole() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const id = Number(params.id);
  const { data: Role } = useGet<EdaRole>(`${API_PREFIX}/roles/${id.toString()}/`);

  const RoleSchemaType = useMemo(
    () =>
      Type.Object({
        name: Type.String({
          title: t('Name'),
          placeholder: t('Enter the name'), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        }),
        url: Type.Optional(
          Type.String({
            title: t('URL'),
            placeholder: t('Enter the Description'), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
          })
        ),
      }),
    [t]
  );

  type RoleSchema = Static<typeof RoleSchemaType>;

  useInvalidateCacheOnUnmount();

  const postRequest = usePostRequest<Partial<EdaRole>, EdaRole>();

  const onSubmit: PageFormSubmitHandler<RoleSchema> = async (Role, setError) => {
    try {
      if (Number.isInteger(id)) {
        Role = await requestPatch<EdaRole>(`${API_PREFIX}/roles/${id}/`, Role);
        navigate(-1);
      } else {
        const newRole = await postRequest(`${API_PREFIX}/roles/`, Role);
        navigate(RouteObj.EdaRoleDetails.replace(':id', newRole.id.toString()));
      }
    } catch (err) {
      setError('TODO');
    }
  };
  const onCancel = () => navigate(-1);

  if (Number.isInteger(id)) {
    if (!Role) {
      return (
        <PageLayout>
          <PageHeader
            breadcrumbs={[{ label: t('Roles'), to: RouteObj.EdaRoles }, { label: t('Edit Role') }]}
          />
        </PageLayout>
      );
    } else {
      return (
        <PageLayout>
          <PageHeader
            title={t('Edit Role')}
            breadcrumbs={[{ label: t('Roles'), to: RouteObj.EdaRoles }, { label: t('Edit Role') }]}
          />
          <PageForm
            schema={RoleSchemaType}
            submitText={t('Save Role')}
            onSubmit={onSubmit}
            cancelText={t('Cancel')}
            onCancel={onCancel}
            defaultValue={Role}
          >
            <PageFormSchema schema={RoleSchemaType} />
          </PageForm>
        </PageLayout>
      );
    }
  } else {
    return (
      <PageLayout>
        <PageHeader
          title={t('Create Role')}
          breadcrumbs={[{ label: t('Roles'), to: RouteObj.EdaRoles }, { label: t('Create Role') }]}
        />
        <PageForm
          schema={RoleSchemaType}
          submitText={t('Create Role')}
          onSubmit={onSubmit}
          cancelText={t('Cancel')}
          onCancel={onCancel}
        >
          <PageFormSchema schema={RoleSchemaType} />
        </PageForm>
      </PageLayout>
    );
  }
}
