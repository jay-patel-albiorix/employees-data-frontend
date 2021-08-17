import _omit from 'lodash/omit'
import _isObject from 'lodash/isObject'
import _mapValues from 'lodash/mapValues'
import _isArray from 'lodash/isArray'
import _map from 'lodash/map'

export const omitDeepFields = (element, omitField) => {
    // console.log("omitDeepFields", element)
    const res = 
    _isArray(element)
    ? _map(
        element,
        currentValue => {
            return omitDeepFields(currentValue, omitField)
        },
    )
    : _isObject(element)
    ? _mapValues(
        _omit(element, omitField), 
        (currentValue, currentKey) => {
            // console.log("\tcurrentKey", currentKey, "currentValue", currentValue)
            return omitDeepFields(currentValue, omitField)
        }
    )
    : element
    // console.log("omitDeepFields-return", res)
    return res
}