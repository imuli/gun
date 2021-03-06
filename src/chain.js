
var Gun = require('./root');
Gun.chain.chain = function(){
	var at = this._, chain = new this.constructor(this), cat = chain._;
	cat.root = root = at.root;
	cat.id = ++root._.once;
	cat.back = this;
	cat.on = Gun.on;
	Gun.on('chain', cat);
	cat.on('in', input, cat); // For 'in' if I add my own listeners to each then I MUST do it before in gets called. If I listen globally for all incoming data instead though, regardless of individual listeners, I can transform the data there and then as well.
	cat.on('out', output, cat); // However for output, there isn't really the global option. I must listen by adding my own listener individually BEFORE this one is ever called.
	return chain;
}
function output(at){
	var cat = this.as, gun = cat.gun, root = gun.back(-1), put, get, now, tmp;
	if(!at.gun){
		at.gun = gun;
	}
	if(get = at.get){
		if(!get[_soul]){
			if(obj_has(get, _field)){
				get = get[_field];
				var next = get? (gun.get(get)._) : cat;
				// TODO: BUG! Handle plural chains by iterating over them.
				if(obj_has(next, 'put')){ // potentially incorrect? Maybe?
				//if(u !== next.put){ // potentially incorrect? Maybe?
					//next.tag['in'].last.next(next);
					next.on('in', next);
					return;
				}
				if(obj_has(cat, 'put')){
				//if(u !== cat.put){
					var val = cat.put, rel;
					if(rel = Gun.node.soul(val)){
						val = Gun.val.rel.ify(rel);
					}
					if(rel = Gun.val.rel.is(val)){
						if(!at.gun._){ return }
						(at.gun._).on('out', {
							get: {'#': rel, '.': get},
							'#': Gun.on.ask(Gun.HAM.synth, at.gun),
							gun: at.gun
						});
						return;
					}
					if(u === val || Gun.val.is(val)){
						if(!at.gun._){ return }
						(at.gun._).on('in', {
							get: get,
							gun: at.gun
						});
						return;
					}
				} else
				if(cat.map){
					obj_map(cat.map, function(proxy){
						proxy.at.on('in', proxy.at);
					});
				}
				if(cat.soul){
					if(!at.gun._){ return }
					(at.gun._).on('out', {
						get: {'#': cat.soul, '.': get},
						'#': Gun.on.ask(Gun.HAM.synth, at.gun),
						gun: at.gun
					});
					return;
				}
				if(cat.get){
					if(!cat.back._){ return }
					(cat.back._).on('out', {
						get: obj_put({}, _field, cat.get),
						gun: gun
					});
					return;
				}
				at = obj_to(at, {get: {}});
			} else {
				if(obj_has(cat, 'put')){
				//if(u !== cat.put){
					cat.on('in', cat);
					//cat.on('in').last.emit(cat);
				} else// TODO: BUG! Handle plural chains by iterating over them.
				if(cat.map){
					obj_map(cat.map, function(proxy){
						proxy.at.on('in', proxy.at);
					});
				}
				if(cat.ack){
					if(!obj_has(cat, 'put')){
						return;
					}
				}
				cat.ack = -1;
				if(cat.soul){
					cat.on('out', {
						get: {'#': cat.soul},
						'#': Gun.on.ask(Gun.HAM.synth, cat.gun),
					});
					return;
				}
				if(cat.get){
					if(!cat.back._){ return }
					(cat.back._).on('out', {
						get: obj_put({}, _field, cat.get),
						gun: cat.gun
					});
					return;
				}
			}
		}
	}
	(cat.back._).on('out', at);
}
function input(at){
	at = at._ || at;
	var ev = this, cat = this.as, gun = at.gun, coat = gun._, change = at.put, back = cat.back._ || empty, rel, tmp;
	if(0 > cat.ack && at.via && !Gun.val.rel.is(change)){ // for better behavior?
		cat.ack = 1;
	}
	if(cat.get && at.get !== cat.get){
		at = obj_to(at, {get: cat.get});
	}
	if(cat.field && coat !== cat){
		at = obj_to(at, {gun: cat.gun});
		if(coat.ack){
			cat.ack = cat.ack || coat.ack;
		}
	}
	if(u === change){
		ev.to.next(at);
		if(cat.soul){ return }
		echo(cat, at, ev);
		if(cat.field){
			not(cat, at);
		}
		obj_del(coat.echo, cat.id);
		obj_del(cat.map, coat.id);
		return;
	}
	if(cat.soul){
		ev.to.next(at);
		echo(cat, at, ev);
		obj_map(change, map, {at: at, cat: cat});
		return;
	}
	if(!(rel = Gun.val.rel.is(change))){
		if(Gun.val.is(change)){
			if(cat.field || cat.soul){
				not(cat, at);
			} else
			if(coat.field || coat.soul){
				(coat.echo || (coat.echo = {}))[cat.id] = cat;
				(cat.map || (cat.map = {}))[coat.id] = cat.map[coat.id] || {at: coat};
				//if(u === coat.put){ return } // Not necessary but improves performance. If we have it but coat does not, that means we got things out of order and coat will get it. Once coat gets it, it will tell us again.
			}
			ev.to.next(at);
			echo(cat, at, ev);
			return;
		}
		if(cat.field && coat !== cat && obj_has(coat, 'put')){
			cat.put = coat.put;
		};
		if((rel = Gun.node.soul(change)) && coat.field){
			coat.put = (cat.root.get(rel)._).put;
		}
		ev.to.next(at);
		echo(cat, at, ev);
		relate(cat, at, coat, rel);
		obj_map(change, map, {at: at, cat: cat});
		return;
	}
	relate(cat, at, coat, rel);
	ev.to.next(at);
	echo(cat, at, ev);
}
Gun.chain.chain.input = input;
function relate(cat, at, coat, rel){
	if(!rel || node_ === cat.get){ return }
	var tmp = (cat.root.get(rel)._);
	if(cat.field){
		coat = tmp;
	} else {
		relate(coat, at, coat, rel);
	}
	if(coat === cat){ return }
	(coat.echo || (coat.echo = {}))[cat.id] = cat;
	if(cat.field && !(cat.map||empty)[coat.id]){
		not(cat, at);
	}
	tmp = (cat.map || (cat.map = {}))[coat.id] = cat.map[coat.id] || {at: coat};
	if(rel !== tmp.rel){
		ask(cat, tmp.rel = rel);
	}
}
function echo(cat, at, ev){
	if(!cat.echo){ return } // || node_ === at.get ????
	if(cat.field){ at = obj_to(at, {event: ev}) }
	obj_map(cat.echo, reverb, at);
}
function reverb(cat){
	cat.on('in', this);
}
function map(data, key){ // Map over only the changes on every update.
	var cat = this.cat, next = cat.next || empty, via = this.at, gun, chain, at, tmp;
	if(node_ === key && !next[key]){ return }
	if(!(gun = next[key])){
		return;
	}
	at = (gun._);
	//if(data && data[_soul] && (tmp = Gun.val.rel.is(data)) && (tmp = (cat.root.get(tmp)._)) && obj_has(tmp, 'put')){
	//	data = tmp.put;
	//}
	if(at.field){
		if(!(data && data[_soul] && Gun.val.rel.is(data) === Gun.node.soul(at.put))){
			at.put = data;
		}
		chain = gun;
	} else {
		chain = via.gun.get(key);
	}
	at.on('in', {
		put: data,
		get: key,
		gun: chain,
		via: via
	});
}
function not(cat, at){
	if(!(cat.field || cat.soul)){ return }
	var tmp = cat.map;
	cat.map = null;
	if(null === tmp){ return }
	if(u === tmp && cat.put !== u){ return } // TODO: Bug? Threw second condition in for a particular test, not sure if a counter example is tested though.
	obj_map(tmp, function(proxy){
		if(!(proxy = proxy.at)){ return }
		obj_del(proxy.echo, cat.id);
	});
	obj_map(cat.next, function(gun, key){
		var coat = (gun._);
		coat.put = u;
		if(coat.ack){
			coat.ack = -1;
		}
		coat.on('in', {
			get: key,
			gun: gun,
			put: u
		});
	});
}
function ask(cat, soul){
	var tmp = (cat.root.get(soul)._);
	if(cat.ack){
		tmp.ack = tmp.ack || -1;
		tmp.on('out', {
			get: {'#': soul},
			'#': Gun.on.ask(Gun.HAM.synth, tmp.gun),
			gun: tmp.gun
		});
		return;
	}
	obj_map(cat.next, function(gun, key){
		(gun._).on('out', {
			get: {'#': soul, '.': key},
			'#': Gun.on.ask(Gun.HAM.synth, tmp.gun),
			gun: gun
		});
	});
}
var empty = {}, u;
var obj = Gun.obj, obj_has = obj.has, obj_put = obj.put, obj_del = obj.del, obj_to = obj.to, obj_map = obj.map;
var _soul = Gun._.soul, _field = Gun._.field, node_ = Gun.node._;
	