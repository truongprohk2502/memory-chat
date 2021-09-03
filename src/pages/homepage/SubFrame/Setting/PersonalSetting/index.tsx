import { useState } from 'react';
import {
  faFileExport,
  faFileImport,
  faPenFancy,
} from '@fortawesome/free-solid-svg-icons';
import { Accordion } from 'components/Accordion';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { useFormik } from 'formik';
import PersonalInfoSchema from 'validations/personalInfo.schema';
import { useTranslation } from 'react-i18next';

const PersonalSetting = () => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const { t } = useTranslation();

  const initialFormValues = {
    fullName: 'Nguyen Dinh Truong',
    email: 'nguyendinhtruong98@gmail.com',
    phone: '0789250298',
    address: '898 Tran Cao Van',
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: initialFormValues,
    validationSchema: PersonalInfoSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      setEditMode(false);
    },
  });

  const handleCancel = () => {
    resetForm({ values: initialFormValues });
    setEditMode(false);
  };

  return (
    <Accordion title={t('setting.options.personal_info.title')}>
      <form>
        <div className="flex justify-end">
          {editMode ? (
            <>
              <Button
                icon={faFileImport}
                text="Save"
                size="sm"
                onClick={() => handleSubmit()}
              />
              <Button
                icon={faFileExport}
                text="Cancel"
                size="sm"
                buttonClassName="ml-2"
                onClick={handleCancel}
              />
            </>
          ) : (
            <Button
              icon={faPenFancy}
              text="Edit"
              size="sm"
              onClick={() => setEditMode(true)}
            />
          )}
        </div>
        <div className="pb-2">
          <div className="text-gray-500">
            {t('setting.options.personal_info.labels.name')}
          </div>
          <Input
            type="text"
            name="fullName"
            value={values.fullName}
            i18nErrorPath={errors.fullName}
            touched={touched.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
            disabled={!editMode}
          />
        </div>
        <div className="py-2">
          <div className="text-gray-500">
            {t('setting.options.personal_info.labels.email')}
          </div>
          <Input
            type="email"
            name="email"
            value={values.email}
            i18nErrorPath={errors.email}
            touched={touched.email}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
            disabled={!editMode}
          />
        </div>
        <div className="py-2">
          <div className="text-gray-500">
            {t('setting.options.personal_info.labels.phone')}
          </div>
          <Input
            type="text"
            name="phone"
            value={values.phone}
            i18nErrorPath={errors.phone}
            touched={touched.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
            disabled={!editMode}
          />
        </div>
        <div className="py-2">
          <div className="text-gray-500">
            {t('setting.options.personal_info.labels.address')}
          </div>
          <Input
            type="text"
            name="address"
            value={values.address}
            i18nErrorPath={errors.address}
            touched={touched.address}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
            disabled={!editMode}
          />
        </div>
      </form>
    </Accordion>
  );
};

export default PersonalSetting;
