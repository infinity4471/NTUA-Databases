import { State } from './state';
/**
 * The settings for the ODataString serialization.
 */
export interface ODataSettings {
    /**
     * Determines if the dates that are set in the filter descriptors will be serialized as UTC by subtracting the offset for the current time zone. Defaults to `false` which means that the dates will be serialized without modification.
     */
    utcDates?: boolean;
}
/**
 * Converts a [`State`]({% slug api_kendo-data-query_state %}) into an OData v4 compatible string.
 *
 * @param {State} state - The state that will be serialized.
 * @param {ODataSettings} settings - The settings that are used during the serialization.
 * @returns {string} - The serialized state.
 */
export declare const toODataString: (state: State, settings?: ODataSettings) => string;
