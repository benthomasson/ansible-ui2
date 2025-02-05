import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ITableColumn, TextCell } from '../../../../../framework';
import { RouteObj } from '../../../../Routes';
import { EdaUser } from '../../../interfaces/EdaUser';

export function useUserColumns() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return useMemo<ITableColumn<EdaUser>[]>(
    () => [
      {
        header: t('Username'),
        cell: (user) => (
          <TextCell
            text={user.name}
            onClick={() => navigate(RouteObj.EdaUserDetails.replace(':id', user.id.toString()))}
          />
        ),
        sort: 'name',
        card: 'name',
        list: 'name',
        defaultSort: true,
      },
      {
        header: t('First name'),
        cell: (user) => user.first_name && <TextCell text={user.first_name} />,
      },
      {
        header: t('Last name'),
        cell: (user) => user.last_name && <TextCell text={user.last_name} />,
      },
      {
        header: t('User type'),
        cell: (user) => user.type && <TextCell text={user.type} />,
      },
    ],
    [navigate, t]
  );
}
