import { List } from 'immutable';
import qs from 'qs';
import { useEffect, useState } from 'react';

import { MUTATION_KEYS, hooks, useMutation, useQuery } from './queryClient';
import {
  APP_SETTING_NAMES,
  DEFAULT_QUERY,
  DEFAULT_SHOW_MODEL,
  DEFAULT_SHOW_QR_CODE,
  MODELS_ENDPOINT,
} from './settings';

export const useSettings = () => {
  const [modelSetting, setModelSetting] = useState(null);
  const [showQrCodeSetting, setShowQrSetting] = useState(null);

  const [showModelSetting, setShowModelSetting] = useState(null);

  const { data: settings, isLoading } = hooks.useAppSettings();

  const { mutate: postAppSetting } = useMutation(
    MUTATION_KEYS.POST_APP_SETTING
  );
  const { mutate: patchAppSetting } = useMutation(
    MUTATION_KEYS.PATCH_APP_SETTING
  );

  const saveModel = (appSetting) => {
    if (!modelSetting) {
      postAppSetting({ ...appSetting, name: APP_SETTING_NAMES.MODEL });
    } else {
      patchAppSetting({ ...appSetting, id: modelSetting.id });
    }
  };

  const saveShowModel = (value) => {
    if (!showModelSetting) {
      postAppSetting({
        data: { showModel: value },
        name: APP_SETTING_NAMES.SHOW_MODEL,
      });
    } else {
      patchAppSetting({ data: { showModel: value }, id: showModelSetting.id });
    }
  };

  const saveShowQrCode = (value) => {
    if (!showQrCodeSetting) {
      postAppSetting({
        data: { [APP_SETTING_NAMES.SHOW_QR_CODE]: value },
        name: APP_SETTING_NAMES.SHOW_QR_CODE,
      });
    } else {
      patchAppSetting({
        data: { [APP_SETTING_NAMES.SHOW_QR_CODE]: value },
        id: showQrCodeSetting.id,
      });
    }
  };

  useEffect(() => {
    if (settings) {
      const newShowQr = settings.find(
        ({ name }) => name === APP_SETTING_NAMES.SHOW_QR_CODE
      );
      const newShowModel = settings.find(
        ({ name }) => name === APP_SETTING_NAMES.SHOW_MODEL
      );
      const newModel = settings.find(
        ({ name }) => name === APP_SETTING_NAMES.MODEL
      );

      if (newShowQr && showQrCodeSetting !== newShowQr) {
        setShowQrSetting(newShowQr);
      }
      if (newShowModel && showModelSetting !== newShowModel) {
        setShowModelSetting(newShowModel);
      }
      if (newModel && modelSetting !== newModel) {
        setModelSetting(newModel);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return {
    showModel:
      showModelSetting?.data?.[APP_SETTING_NAMES.SHOW_MODEL] ??
      DEFAULT_SHOW_MODEL,
    saveShowModel,
    showQrCode:
      showQrCodeSetting?.data?.[APP_SETTING_NAMES.SHOW_QR_CODE] ??
      DEFAULT_SHOW_QR_CODE,
    saveShowQrCode,
    model: modelSetting?.data?.[APP_SETTING_NAMES.MODEL],
    saveModel,
    isLoading,
  };
};

export const useModels = (queryParams = {}) =>
  useQuery({
    queryKey: ['models', queryParams.q],
    queryFn: async () => {
      const queryString = qs.stringify(
        {
          type: 'models',
          ...queryParams,
          q: queryParams.q || DEFAULT_QUERY,
        },
        {
          addQueryPrefix: true,
        }
      );
      // cannot use axios https://github.com/miragejs/miragejs/issues/1006
      const response = await fetch(`${MODELS_ENDPOINT}${queryString}`);
      return List((await response.json()).results);
    },
  });
