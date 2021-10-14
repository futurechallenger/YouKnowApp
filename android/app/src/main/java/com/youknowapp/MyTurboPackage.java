package com.youknowapp;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.modules.blob.FileReaderModule;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.youknowapp.Filling.FillingEventHole;

import java.util.HashMap;
import java.util.Map;

public class MyTurboPackage extends TurboReactPackage {
    @Override
    public NativeModule getModule(String name, ReactApplicationContext reactContext) {
        if (name.equals(FillingEventHole.MODULE_NAME)) {
            return new FillingEventHole(reactContext);
        }

        return null;
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return new ReactModuleInfoProvider() {
            @Override
            public Map<String, ReactModuleInfo> getReactModuleInfos() {
                Class<? extends NativeModule> moduleClass = FillingEventHole.class;
                ReactModule reactModule = moduleClass.getAnnotation(ReactModule.class);

                Map<String, ReactModuleInfo> moduleInfo = new HashMap<String, ReactModuleInfo>();
                moduleInfo.put(FillingEventHole.MODULE_NAME,
                        new ReactModuleInfo(
                                reactModule.name(),
                                moduleClass.getName(),
                                true,
                                reactModule.needsEagerInit(),
                                reactModule.hasConstants(),
                                reactModule.isCxxModule(),
//                                TurboModule.class.isAssignableFrom(moduleClass)
                                true
                        ));
                return moduleInfo;
            }
        };
    }
}
