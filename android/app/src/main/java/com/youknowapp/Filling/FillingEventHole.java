package com.youknowapp.Filling;

import android.os.Looper;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Timer;

@ReactModule(name = FillingEventHole.MODULE_NAME)
public class FillingEventHole extends ReactContextBaseJavaModule {
    public static final String MODULE_NAME = "FillingHoleModule";

    public FillingEventHole(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return FillingEventHole.MODULE_NAME;
    }

    @ReactMethod
    public void sendEventInSeconds(int seconds, Promise promise) {
        Log.d("FillEventHole", "Event from native comes in" + seconds);
        try {
            new android.os.Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
                @Override
                public void run() {
                    WritableMap params = Arguments.createMap();
                    params.putString("filling", "hole");
                    params.putString("with", "RN");
                    FillingEventHole.this.sendEvent("FillingHole", params);
                }
            }, seconds * 1000);

            promise.resolve("Done");
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        this.getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
