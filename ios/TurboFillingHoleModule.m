//
//  TurboFillingHoleModule.m
//  YouKnowApp
//
//  Created by uncle charlie on 2021/10/16.
//

#import "TurboFillingHoleModule.h"

RCTBridge *_bridge = nil;

@implementation TurboFillingHoleModule

RCT_EXPORT_MODULE(TurboFillingHoleModule)

- (void)setBridge:(RCTBridge *)bridge {
  [super setBridge: bridge];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"FillingHoleV2"];
}

@end
