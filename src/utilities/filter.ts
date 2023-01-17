import { IFilterParams } from 'src/interfaces/filter.type';

function filterTypeChecker(filter: IFilterParams, field: string) {
  const fieldName = field;
  if (filter[field].type === 'text') {
    return {
      [fieldName]: new RegExp(filter[field].value),
    };
  } else if (filter[field].type === 'number') {
    return {
      [fieldName]: filter[field].value,
    };
  } else if (filter[field].type === 'rangenumber') {
    return {
      [fieldName]: {
        $gte: filter[field].value[0],
        $lte: filter[field].value[1],
      },
    };
  } else if (filter[field].type === 'date') {
    const [year, month, date] = filter[field].value.split('-');
    return {
      [fieldName]: {
        $gte: new Date(year, month + 1, date).toLocaleDateString(),
        $lte: new Date(
          year,
          month + 1,
          parseInt(date) + 1,
        ).toLocaleDateString(),
      },
    };
  } else if (filter[field].type === 'daterange') {
    const [year1, month1, date1] = filter[field].value[0].split('-');
    const [year2, month2, date2] = filter[field].value[1].split('-');
    return {
      [fieldName]: {
        $gte: new Date(year1, month1 + 1, date1).toLocaleDateString(),
        $lte: new Date(year2, month2 + 1, date2).toLocaleDateString(),
      },
    };
  }
}

async function filterUtilities(filter: IFilterParams) {
  if (!filter) return null;
  const filterKeys = Object.keys(filter);
  let newFilter = {};
  filterKeys.map((field) => {
    if (filter[field].type) {
      newFilter = {
        ...newFilter,
        [field]: {
          type: filter[field].type,
          value: filter[field].value,
        },
      };
    } else {
      newFilter = {
        ...newFilter,
        [field]: {
          type: 'text',
          value: filter[field].value,
        },
      };
    }
  });
  let result: any;
  if (filterKeys.length === 1) {
    result = filterTypeChecker(newFilter as IFilterParams, filterKeys[0]);
  } else {
    filterKeys.forEach((field) => {
      const tempRes = filterTypeChecker(newFilter as IFilterParams, field);
      result = {
        ...result,
        ...tempRes,
      };
    });
  }
  return result;
}

export default filterUtilities;
