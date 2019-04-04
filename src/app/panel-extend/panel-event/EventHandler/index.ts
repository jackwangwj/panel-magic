import { TapCallHandler } from './TapCallHandler';
import { TapNavigateHandler } from './TapNavigateHandler';
import { TapToXcxHandler } from './TapToXcxHandler';
import { EventModel } from './EventModel'
import { TapVesselStatusHandler } from './TapVesselStatusHandler';
import { TapMapHandler } from './TapMapHandler';
import { TapProductDetailHandler } from './TapProductDetailHandler';

export * from './TapCallHandler'
export * from './TapNavigateHandler'
export * from './TapToXcxHandler'
export * from './TapVesselStatusHandler'
export * from './TapMapHandler'
export * from './TapProductDetailHandler'
export * from './EventModel'

export type TEventHandler = TapCallHandler | TapNavigateHandler | TapToXcxHandler | TapVesselStatusHandler | TapMapHandler | TapProductDetailHandler | EventModel
