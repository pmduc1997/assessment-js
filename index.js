/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

exports.stripPrivateProperties = (excludedProperties = [], data = []) => {
  return data.map((el) => {
    excludedProperties.forEach((property) => {
      //delete here since data mutation is accpected
      delete el[property];
    });
    return el;
  });
};
exports.excludeByProperty = (excludedProperty = "", data = []) => {
  return data.reduce((accumulator, currentValue) => {
    if (!currentValue.hasOwnProperty(excludedProperty)) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);
};
exports.sumDeep = (data = []) => {
  return data.map((el) => {
    const reducedObjects = el.objects.reduce((accumulator, currentValue) => {
      accumulator += currentValue.val;
      return accumulator;
    }, 0);
    return {
      objects: reducedObjects,
    };
  });
};
exports.applyStatusColor = (colors = {}, statuses = []) => {
  const hashColors = new Map();
  for (color in colors) {
    colors[color].forEach((status) => {
      hashColors.set(status, color);
    });
  }
  return statuses.reduce((accumulator, currentValue) => {
    if (hashColors.get(currentValue.status)) {
      accumulator.push({
        ...currentValue,
        color: hashColors.get(currentValue.status),
      });
    }
    return accumulator;
  }, []);
};
exports.createGreeting = (greetFunc, greet = "") => {
  return (name = "") => {
    return greetFunc(greet, name);
  };
};
exports.setDefaults = (defaultProperties = {}) => {
  return (data = {}) => {
    return {
      ...defaultProperties,
      ...data,
    };
  };
};
exports.fetchUserByNameAndUsersCompany = async (
  userName = "",
  { fetchStatus, fetchUsers, fetchCompanyById }
) => {
  const [status, users] = await Promise.all([fetchStatus(), fetchUsers()]);
  const selectedUser = users.find((user) => user.name === userName);
  const company = await fetchCompanyById(selectedUser.companyId);
  return {
    company,
    status,
    user: selectedUser,
  };
};
