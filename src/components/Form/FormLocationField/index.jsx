/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy, useEffect, useState } from 'react';

const FormRadio = lazy(() => import('../FormRadio'));
const SelectComponent = lazy(() => import('../../Select'));

const FormLocationField = ({ field, validator }) => {
  const [locations] = useState([]);
  const [fieldSelect, setFieldSelect] = useState({
    label: 'Location',
    key: 'selectlocation',
    classNameInput: 'btn-outline-primary',
    option: field.isAll
      ? [
          { label: 'All countries', value: 'yes' },
          { label: 'Enter another location', value: 'no' },
        ]
      : [{ label: 'Enter another location', value: 'no' }],
    value: field.all,
    required: true,
    validation: 'required',
    changed: (event) => {
      setFieldSelect({ ...fieldSelect, value: event.target.value });

      field.changedAll(event.target.value);
    },
  });

  useEffect(() => {
    return () => {};
  }, []);

  // const filterLocation = (value, dataLocation) => {
  //   return Array.isArray(dataLocation)
  //     ? dataLocation
  //         // .filter((i) => i.name.toLowerCase().includes(value.toLowerCase()))
  //         .map((location) => ({
  //           label: location.name,
  //           value: field.name === 'googleads' ? location.id : location.key,
  //         }))
  //     : [];
  // };

  if (!locations) {
    return null;
  }

  return (
    <div className="position-relative z-index-10">
      <FormRadio field={fieldSelect} />

      {fieldSelect.value !== 'yes' && (
        <>
          <SelectComponent
            defaultValue={field.value}
            onChange={field.changed}
            className="text-green w-100"
            isBorder={true}
            plColor="rgba(8, 18, 64, 0.8)"
            isMulti={field.isMulti ?? false}
            async={true}
            cacheOptions
          />
          {field.validation &&
            validator.message(field.label, field.value, field.validation, {
              className: 'text-danger',
            })}
        </>
      )}
    </div>
  );
};

export default FormLocationField;
