import qs from 'qs';
import { useEffect, useState } from 'react';

import { UseQueryResult } from '@tanstack/react-query';
import { hooks, mutations, useQuery } from './queryClient';
import {
  APP_SETTING_NAMES,
  DEFAULT_QUERY,
  DEFAULT_SHOW_MODEL,
  DEFAULT_SHOW_QR_CODE,
  MODEL_INFO_ENDPOINT,
  MODEL_SEARCH_ENDPOINT,
} from './settings';
import { Model } from '../types/models';

interface SettingsProps {
  showModel: boolean;
  saveShowModel: (val: boolean) => void;
  showQrCode: boolean;
  saveShowQrCode: (val: boolean) => void;
  model?: string;
  saveModel: (val: ModelToSave) => void;
  isLoading: boolean;
}
interface ModelToSave {
  data: { model: string };
}
interface ModelSetting {
  id: string;
  data: {
    showQrCode: boolean;
    showModel: boolean;
    model: string;
  };
}

export const useSettings = (): SettingsProps => {
  const [modelSetting, setModelSetting] = useState<null | ModelSetting>(null);
  const [showQrCodeSetting, setShowQrSetting] = useState<null | ModelSetting>(
    null,
  );

  const [showModelSetting, setShowModelSetting] = useState<null | ModelSetting>(
    null,
  );

  const { data: settings, isLoading } = hooks.useAppSettings();

  const { mutate: postAppSetting } = mutations.usePostAppSetting();
  const { mutate: patchAppSetting } = mutations.usePatchAppSetting();

  const saveModel = (appSetting: ModelToSave): void => {
    if (!modelSetting) {
      postAppSetting({ ...appSetting, name: APP_SETTING_NAMES.MODEL });
    } else {
      patchAppSetting({ ...appSetting, id: modelSetting.id });
    }
  };

  const saveShowModel = (value: boolean): void => {
    if (!showModelSetting) {
      postAppSetting({
        data: { showModel: value },
        name: APP_SETTING_NAMES.SHOW_MODEL,
      });
    } else {
      patchAppSetting({ data: { showModel: value }, id: showModelSetting.id });
    }
  };

  const saveShowQrCode = (value: boolean): void => {
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
        ({ name }: { name: string }) => name === APP_SETTING_NAMES.SHOW_QR_CODE,
      );
      const newShowModel = settings.find(
        ({ name }: { name: string }) => name === APP_SETTING_NAMES.SHOW_MODEL,
      );
      const newModel = settings.find(
        ({ name }: { name: string }) => name === APP_SETTING_NAMES.MODEL,
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

export const useModelsSearch = (
  queryParams: { q?: string } = {},
): UseQueryResult<Model[], Error> =>
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
        },
      );
      // cannot use axios https://github.com/miragejs/miragejs/issues/1006
      const response = await fetch(`${MODEL_SEARCH_ENDPOINT}${queryString}`);
      return (await response.json()).results;
    },
  });

export const useModelInfo = (uid?: string): UseQueryResult<Model, Error> =>
  useQuery({
    queryKey: ['model', uid],
    queryFn: async () => {
      const response = await fetch(`${MODEL_INFO_ENDPOINT}${uid}`);
      const data = await response.json();
      return data;
    },
  });
