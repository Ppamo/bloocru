

function navMenuOnOver(node)
{
	node.className='navMenuNodeOnOver';
}

function navMenuOnOut(node)
{
	node.className='navMenuNode';
}

function navMenuOnClick(node)
{
	var option=getAttribute(node, 'menuOption');
	switch(option)
	{
		case '1':
			window.location.href='menu.html';
			break;
		case '2':
			window.history.back(-1);
			break;
		case '3':
			location.reload(true);
			break;
	}
}

function updateField(node)
{
	var isUpdating=getAttribute(node, 'isUpdating');
	if (isUpdating != true)
	{
		setAttribute(node, 'isUpdating', true);
		setAttribute(node, 'originalValue', node.innerText);
		
		node.innerHTML = '<input type="text" value="' + node.innerHTML +'" onKeyUp="updateField_onKeyUp(event);" onBlur="updateField_onBlur(event);"></input>'
		node.firstChild.focus();
	}
}

function cancelUpdateField(inputNode)
{
	var node=inputNode.parentNode;
	var isUpdating=getAttribute(node, 'isUpdating');
	if (isUpdating)
	{
		setAttribute(node, 'isUpdating', false);
		var originalValue=getAttribute(node, 'originalValue');
		setAttribute(node, 'originalValue', '');		
		node.innerText = originalValue;
	}
}

function setValueUpdateField(inputNode)
{
	var node=inputNode.parentNode;
	var isUpdating=getAttribute(node, 'isUpdating');
	if (isUpdating)
	{
		setAttribute(node, 'isUpdating', false);
		setAttribute(node, 'originalValue', '');
		var value=inputNode.value;
		// alert(value);
		node.innerText = value;
	}
}

function updateField_onKeyUp(e)
{
	var source=window.event.srcElement;
	switch(e.keyCode)
	{
		case 27:
			// escape key, cancel the update
			source.blur();
			break;
		case 13:
			// return key, save the change
			setValueUpdateField(source);
			break;
	}
}

function updateField_onBlur(e)
{
	cancelUpdateField(window.event.srcElement);
}

function tipOnOver(node)
{
	node.className='tipOnOver';
}

function tipOnOut(node)
{
	node.className='tip';
}

function tipOnClick(node)
{
	node.className='tipOnClick';
}

function eventOnOver(node)
{
	node.className='eventOnOver';
}

function eventOnOut(node)
{
	node.className='event';
}

function eventOnClick(node)
{
	node.className='eventOnClick';
}

function messageOnOver(node)
{
	node.className='messageOnOver';
}

function messageOnOut(node)
{
	node.className='message';
}

function messageOnClick(node)
{
	node.className='messageOnClick';
}

function messagesPageOnLoad()
{
	$('.messages').jScrollPane();
}


