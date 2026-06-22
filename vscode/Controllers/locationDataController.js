import { Country, State, City } from '../Models/lookupData.model.js';
import { ApiError } from '../Utils/apiError.js';
import { STATUS_CODES, MESSAGES } from '../Utils/status.codes.messages.js';

export const createCountry = async (req, res, next) => {
  try {
    const { name, iso2, iso3, phone_code } = req.body;
    const country = await Country.create({ name, iso2, iso3, phone_code });
    
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      data: country,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new ApiError(STATUS_CODES.CONFLICT, "Country or ISO code already exists"));
    }
    next(error);
  }
};
// Update Country
export const updateCountry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const country = await Country.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!country) throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.COUNTRY_NOT_FOUND);

    res.status(STATUS_CODES.SUCCESS).json({ success: true, data: country });
  } catch (error) {
    next(error);
  }
};
// Delete Country
export const deleteCountry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const country = await Country.findByIdAndDelete(id);
    
    if (!country) throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.COUNTRY_NOT_FOUND);

    res.status(STATUS_CODES.SUCCESS).json({ success: true, message: "Country deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllCountries = async (req, res, next) => {
  try {
    const countries = await Country.find({}).sort({ name: 1 });
    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      count: countries.length,
      data: countries,
    });
  } catch (error) {
    next(new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR_FETCHING_COUNTRIES, [error.message]));
  }
};

export const getStatesByCountry = async (req, res, next) => {
  try {
    const { countryId } = req.params;

    if (!countryId || !countryId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Invalid Country ID format.");
    }

    const countryExists = await Country.findById(countryId);
    if (!countryExists) {
      throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.COUNTRY_NOT_FOUND);
    }

    const states = await State.find({ country: countryId }).sort({ name: 1 });
    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      count: states.length,
      data: states,
    });
  } catch (error) {
    next(error);
  }
};

export const createState = async (req, res, next) => {
  try {
    const { name, country, iso2 } = req.body;

    // Check if country exists
    const countryExists = await Country.findById(country);
    if (!countryExists) throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.COUNTRY_NOT_FOUND);

    const state = await State.create({ name, country, iso2 });
    res.status(STATUS_CODES.CREATED).json({ success: true, data: state });
  } catch (error) {
    if (error.code === 11000) return next(new ApiError(STATUS_CODES.CONFLICT, "State already exists in this country"));
    next(error);
  }
};
// Update State
export const updateState = async (req, res, next) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!state) throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.STATE_NOT_FOUND);
    res.status(STATUS_CODES.SUCCESS).json({ success: true, data: state });
  } catch (error) {
    next(error);
  }
};

// Delete State
export const deleteState = async (req, res, next) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.STATE_NOT_FOUND);
    res.status(STATUS_CODES.SUCCESS).json({ success: true, message: "State deleted" });
  } catch (error) {
    next(error);
  }
};

// Create City
export const createCity = async (req, res, next) => {
  try {
    const { name, state, country } = req.body;

    // Validate if State and Country exist
    const stateExists = await State.findById(state);
    if (!stateExists) throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.STATE_NOT_FOUND);

    const city = await City.create({ name, state, country });
    res.status(STATUS_CODES.CREATED).json({ success: true, data: city });
  } catch (error) {
    if (error.code === 11000) return next(new ApiError(STATUS_CODES.CONFLICT, "City already exists in this state"));
    next(error);
  }
};

// Delete City
export const deleteCity = async (req, res, next) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) throw new ApiError(STATUS_CODES.NOT_FOUND, "City not found");
    res.status(STATUS_CODES.SUCCESS).json({ success: true, message: "City deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const getCitiesByState = async (req, res, next) => {
  try {
    const { stateId } = req.params;

    if (!stateId || !stateId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Invalid State ID format.");
    }

    const stateExists = await State.findById(stateId);
    if (!stateExists) {
      throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.STATE_NOT_FOUND);
    }

    const cities = await City.find({ state: stateId }).sort({ name: 1 });
    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      count: cities.length,
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

// Update City
export const updateCity = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validation: Check if ID is valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid City ID format");
    }

    const city = await City.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!city) {
      throw new ApiError(STATUS_CODES.NOT_FOUND, "City not found");
    }

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "City updated successfully",
      data: city
    });
  } catch (error) {
    next(error);
  }
};

export const bulkDeleteCities = async (req, res, next) => {
  try {
    const { cityIds } = req.body;

    if (!cityIds || !Array.isArray(cityIds) || cityIds.length === 0) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Please provide an array of city IDs"
      );
    }

    // Validate all IDs
    const invalidIds = cityIds.filter(
      (id) => !id.match(/^[0-9a-fA-F]{24}$/)
    );

    if (invalidIds.length > 0) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Some city IDs are invalid"
      );
    }

    const result = await City.deleteMany({
      _id: { $in: cityIds },
    });

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: `${result.deletedCount} cities deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};