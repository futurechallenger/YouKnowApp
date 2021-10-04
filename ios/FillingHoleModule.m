//
//  FillingHoleModule.m
//  YouKnowApp
//
//  Created by uncle charlie on 2021/10/4.
//

#import "FillingHoleModule.h"

@implementation FillingHoleModule

RCT_EXPORT_MODULE(FillingHoleModule)

RCT_EXPORT_METHOD(sendEventInSeconds: (NSUInteger) seconds resolver:(RCTPromiseResolveBlock) resolve
rejecter: (RCTPromiseRejectBlock) reject) {
  @try {
    dispatch_time_t delay = dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC * seconds);
    dispatch_after(delay, dispatch_get_main_queue(), ^(void) {
      [self sendEventWithName:@"FillingHole" body:@{@"filling": @"hole", @"with": @"RN"}];
    });
    
    NSLog(@"Resolved");
    resolve(@"done");
  } @catch (NSException *exception) {
    NSLog(@"Rejected %@", exception);
    reject(@"Failed", @"Cannot setup timeout", nil);
  }
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"FillingHole"];
}

@end
