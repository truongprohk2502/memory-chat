import { useEffect, useState } from 'react';
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
import { SettingLabelType } from 'interfaces/stringLiterals';
import { RootState } from 'reducers';
import { useDispatch, useSelector } from 'react-redux';
import { putUserInfoRequest } from 'reducers/auth';
import { getFilterPropsObject } from 'utils/filterProps';
import { toast } from 'react-toastify';

interface IProps {
  expandingSettingType: SettingLabelType;
  setExpandingSettingType: (value: SettingLabelType) => void;
}

const PersonalSetting = ({
  expandingSettingType,
  setExpandingSettingType,
}: IProps) => {
  const [expanding, setExpanding] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { userInfo, updateInfoSuccess, error } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialFormValues = {
    firstName: userInfo?.firstName || '',
    middleName: userInfo?.middleName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    gender: userInfo?.gender || '',
    phone: userInfo?.phone || '',
    dob: userInfo?.dob || '',
    address: userInfo?.address || '',
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
    enableReinitialize: true,
    initialValues: initialFormValues,
    validationSchema: PersonalInfoSchema,
    onSubmit: values => {
      dispatch(putUserInfoRequest(getFilterPropsObject(values, ['email'])));
      setEditMode(false);
    },
  });

  useEffect(() => {
    if (expandingSettingType !== 'personal-info') {
      setExpanding(false);
    }
  }, [expandingSettingType]);

  useEffect(() => {
    updateInfoSuccess &&
      toast.success(t('setting.personal_info.toasts.updated_info_success'));
  }, [updateInfoSuccess, t]);

  useEffect(() => {
    if (error) {
      toast.error(t(`setting.personal_info.toasts.${error}`));
    }
  }, [error, t]);

  const handleCancel = () => {
    resetForm({ values: initialFormValues });
    setEditMode(false);
  };

  const handleToggleExpand = () => {
    if (!expanding) {
      setExpandingSettingType('personal-info');
    }
    setExpanding(!expanding);
  };

  return (
    <Accordion
      title={t('setting.personal_info.title')}
      expanding={expanding}
      onToggleExpand={handleToggleExpand}
    >
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
            {t('setting.personal_info.labels.first_name')}&nbsp;*
          </div>
          <Input
            type="text"
            name="firstName"
            value={values.firstName}
            i18nErrorPath={errors.firstName}
            touched={touched.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
            disabled={!editMode}
          />
        </div>
        <div className="pb-2">
          <div className="text-gray-500">
            {t('setting.personal_info.labels.middle_name')}
          </div>
          <Input
            type="text"
            name="middleName"
            value={values.middleName}
            i18nErrorPath={errors.middleName}
            touched={touched.middleName}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
            disabled={!editMode}
          />
        </div>
        <div className="pb-2">
          <div className="text-gray-500">
            {t('setting.personal_info.labels.last_name')}&nbsp;*
          </div>
          <Input
            type="text"
            name="lastName"
            value={values.lastName}
            i18nErrorPath={errors.lastName}
            touched={touched.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
            disabled={!editMode}
          />
        </div>
        <div className="py-2">
          <div className="text-gray-500">
            {t('setting.personal_info.labels.email')}
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
            readOnly
          />
        </div>
        <div className="py-2">
          <div className="text-gray-500">
            {t('setting.personal_info.labels.gender')}&nbsp;*
          </div>
          <Input
            type="radio-group"
            name="gender"
            radioOptions={[
              { value: 'male', label: t('registration.gender.options.male') },
              {
                value: 'female',
                label: t('registration.gender.options.female'),
              },
            ]}
            selectedRadioLabel={
              values.gender
                ? t(`registration.gender.options.${values.gender}`)
                : ''
            }
            value={values.gender}
            i18nErrorPath={errors.gender}
            touched={touched.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
            disabled={!editMode}
            readOnly
          />
        </div>
        <div className="pb-2">
          <div className="text-gray-500">
            {t('setting.personal_info.labels.dob')}&nbsp;*
          </div>
          <Input
            type="date"
            name="dob"
            value={values.dob}
            i18nErrorPath={errors.dob}
            touched={touched.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            blocked
            disabled={!editMode}
          />
        </div>
        <div className="py-2">
          <div className="text-gray-500">
            {t('setting.personal_info.labels.phone')}&nbsp;*
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
            {t('setting.personal_info.labels.address')}&nbsp;*
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
