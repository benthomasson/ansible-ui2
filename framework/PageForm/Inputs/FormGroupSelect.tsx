import { Select, SelectOptionObject, SelectProps, SelectVariant } from '@patternfly/react-core';
import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import { PageFormGroup, PageFormGroupProps } from './PageFormGroup';

export type FormGroupSelectProps = Pick<
  SelectProps,
  'footer' | 'isCreatable' | 'isGrouped' | 'onSelect' | 'placeholderText' | 'value' | 'isDisabled'
> &
  PageFormGroupProps & { isReadOnly?: boolean; placeholderText: string | React.ReactNode };

/** A PatternFly FormGroup with a PatternFly Select */
export function FormGroupSelect(props: FormGroupSelectProps) {
  const {
    value,
    onSelect,
    children,
    helperTextInvalid,
    labelHelpTitle,
    labelHelp,
    helperText,
    isRequired,
    isReadOnly,
    additionalControls,
    placeholderText,
    ...selectProps
  } = props;
  const [open, setOpen] = useState(false);
  const onToggle = useCallback(() => setOpen((open) => !open), []);

  const onSelectHandler = useCallback(
    (
      event: React.MouseEvent<Element, MouseEvent> | ChangeEvent<Element>,
      value: string | SelectOptionObject
    ) => {
      if (typeof value === 'string') onSelect?.(event, value);
      else onSelect?.(event, value.toString());
      setOpen(false);
    },
    [onSelect]
  );

  return (
    <PageFormGroup {...props}>
      <Select
        {...selectProps}
        label={undefined}
        placeholderText={placeholderText}
        variant={SelectVariant.single}
        aria-describedby={props.id ? `${props.id}-form-group` : undefined}
        selections={value}
        onSelect={onSelectHandler}
        isOpen={open}
        onToggle={onToggle}
        maxHeight={280}
        validated={helperTextInvalid ? 'error' : undefined}
        isDisabled={props.isDisabled || isReadOnly}
        // ZIndex 400 is needed for PF table stick headers
        style={{ zIndex: open ? 400 : undefined }}
      >
        {children as ReactElement[]}
      </Select>
    </PageFormGroup>
  );
}
