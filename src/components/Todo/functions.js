function validate(inputRef) {
  if (inputRef.current.value.trim().length <= 3) {
    alert(
      "Maydonga to'liq ma'lumot kiritilishi va probellardan tashkil topgan yoki ishoralar soni 3 tadan kam bo'lishi mumkin meas ma'lumot kiritilishi shart "
    );
    inputRef.current.focus();
    inputRef.current.value = "";
    return false;
  }
  return true;
}
function LocalStorageSet(data){
    localStorage.setItem('todos',JSON.stringify(data))
}

export { validate ,LocalStorageSet};
